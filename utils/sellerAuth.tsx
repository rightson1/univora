"use client";
import { createContext, use, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { IAuthUser, ISeller, ISellerFetched } from "@/types";
import { eCheck } from "@/components/helpers/functions";
import { protocal, root_domain } from "./data";
const AuthContext = createContext({});

export const SellerAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [admin, setAdmin] = useState<IAuthUser | {} | null>({});
  const [seller, setSeller] = useState<ISellerFetched | null>(null);
  const router = useRouter();
  const [s_link, setLink] = useState<string>("");
  useEffect(() => {
    if (seller) {
      setLink(`${protocal}://${seller.school.subdomain}.${root_domain}`);
    }
  }, [seller]);

  const setCookie = (token: string) => {
    Cookies.set("token", token);
  };
  const clearCookie = () => {
    Cookies.remove("token");
  };
  const fetchSeller = async (uid: string) => {
    const userRaw = await axios
      .get(`/api/open/seller?uid=${uid}`)
      .then(eCheck)
      .catch((e) => {
        // toast.error(e.message);
        return null;
      });
    const fUser: ISellerFetched = userRaw;
    if (fUser) {
      setSeller(fUser);
      localStorage.setItem("seller", JSON.stringify(fUser));
    } else {
      setSeller(null);
      setAdmin(null);
    }
  };

  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("seller");
    const localUser: ISellerFetched | null = userString
      ? JSON.parse(userString)
      : null;

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie(token);
        if (localUser?.uid === user.uid) {
          setAdmin({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });

          setSeller(localUser);
        } else {
          console.log(user);
          fetchSeller(user.uid);
        }
      } else {
        setAdmin(null);
        setSeller(null);
        clearCookie();
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        window.location.href = "/";
      })
      .catch((error) => {
        const errorMessage = error.message;
        throw new Error(errorMessage);
      });
  };

  const logout = async () => {
    await auth.signOut();
    localStorage.removeItem("seller");
    clearCookie();
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        seller,
        signIn,
        fetchSeller,
        logout,
        admin,
        s_link,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  seller: ISellerFetched;
  admin: IAuthUser | {} | null;
  s_link: string;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  fetchSeller: (uid: string) => void;
  logout: () => Promise<void>;
}

export const useSellerAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
