"use client";
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { IAuthUser, ISeller } from "@/types";
const AuthContext = createContext({});

export const SellerAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [admin, setAdmin] = useState<IAuthUser | {} | null>({});
  const [seller, setSeller] = useState<ISeller | null>(null);
  const router = useRouter();
  const setCookies = (role: string) => {
    Cookies.set("role", role);
  };
  const clearRoleCookie = () => {
    Cookies.remove("role");
  };
  const fetchUser = async (uid: string) => {
    const userRaw = await axios
      .get(`/api/open/seller?uid=${uid}`)
      .then((res) => res.data)
      .catch((e) => {
        // toast.error(e.message);
        return null;
      });
    const fUser: ISeller = userRaw;
    if (fUser) {
      setSeller(fUser);
      localStorage.setItem("seller", JSON.stringify(fUser));
      setCookies("seller");
    } else {
      setSeller(null);
      setAdmin(null);
    }
  };

  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("seller");
    const localUser: ISeller | null = userString
      ? JSON.parse(userString)
      : null;

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (localUser?.uid === user.uid) {
          setAdmin({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          setCookies("seller");
          setSeller(localUser);
        } else {
          console.log(user);
          fetchUser(user.uid);
        }
      } else {
        setAdmin(null);
        setSeller(null);
        clearRoleCookie();
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
    clearRoleCookie();
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        seller,
        signIn,
        fetchUser,
        logout,
        admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  seller: ISeller;
  admin: IAuthUser | {} | null;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  fetchUser: (uid: string) => void;
  logout: () => Promise<void>;
}

export const useSellerAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
