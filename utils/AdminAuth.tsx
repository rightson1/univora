"use client";
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IAdminFetched, IAdmin } from "@/types";
import axios from "axios";
const AuthContext = createContext({});
const setCookie = (token: string) => {
  Cookies.set("token", token);
};
const clearCookie = () => {
  Cookies.remove("token");
};
export const AdminAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [admin, setAdmin] = useState<IAdmin | {} | null>({});
  const [user, setUser] = useState<IAdminFetched | null>(null);
  const router = useRouter();

  const fetchUser = async (uid: string) => {
    const userRaw = await axios
      .get(`/api/open/admins?uid=${uid}`)
      .then((res) => res.data)
      .catch((e) => {
        // toast.error(e.message);
        return null;
      });
    const fUser: IAdminFetched = userRaw;
    if (fUser) {
      setUser(fUser);
      localStorage.setItem("administrator", JSON.stringify(fUser));
    } else {
      setUser(null);
      setAdmin(null);
      clearCookie();
    }
  };

  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("administrator");
    const localUser: IAdminFetched | null = userString
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

          setUser(localUser);
        } else {
          console.log(user);
          fetchUser(user.uid);
        }
      } else {
        setAdmin(null);
        setUser(null);

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
    localStorage.removeItem("administrator");

    clearCookie();
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
  user: IAdminFetched;
  admin: IAdmin | null;
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

export const useAdminAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
