"use client";
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";
import Cookies from "js-cookie";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { ISAdmin } from "@/types";
const AuthContext = createContext({});

export const SuperAdminAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [admin, setAdmin] = useState<ISAdmin | {} | null>({});
  const [user, setUser] = useState<ISAdmin | null>(null);
  const router = useRouter();
  const setCookies = (token: string) => {
    Cookies.set("token", token);
  };
  const clearCookie = () => {
    Cookies.remove("token");
  };
  const fetchUser = async (uid: string) => {
    const docRef = doc(db, "administrators", uid);
    const docSnap = await getDoc(docRef);
    const fUser = docSnap.data() as ISAdmin;
    if (fUser) {
      setUser(fUser);
      localStorage.setItem("administrator", JSON.stringify(fUser));
    } else {
      setUser(null);
      setAdmin(null);
    }
  };

  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("administrator");
    const localUser: ISAdmin | null = userString
      ? JSON.parse(userString)
      : null;

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log(token);
        setCookies(token);
        setAdmin({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        if (localUser?.uid === user.uid) {
          setUser(localUser);
        } else {
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
  const handleSignInSuper = () => {
    const googleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          const { displayName, email, photoURL, uid } = result.user;
          const docRef = doc(db, "administrators", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            router.push("/");
            return;
          } else {
            // await setDoc(doc(db, "administrators", uid), {
            //   displayName: displayName!,
            //   email: email!,
            //   photoURL,
            //   uid,
            //   createdAt: new Date(),
            //   role: "super_admin",
            //   updatedAt: new Date(),
            //   phone: process.env.NEXT_PUBLIC_PHONE,
            // } as unknown as ISAdmin).then(() => {
            //   router.push("/");
            // });
            throw new Error("You are not authorized to access this page");
          }
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    };
    toast.promise(googleSignIn(), {
      loading: "Loading",
      success: <b>Sign In Successful</b>,
      error: <b>Sign In Failed</b>,
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
        handleSignInSuper,
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
  user: ISAdmin;
  admin: ISAdmin | null;
  handleSignInSuper: () => void;
  fetchUser: (uid: string) => void;
  logout: () => Promise<void>;
}

export const useSuperAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
