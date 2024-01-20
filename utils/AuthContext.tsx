"use client";
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";

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
import { UserProps } from "@/types";
const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<UserProps | {}>({});
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  const fetchUser = async (uid: string) => {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    await getDocs(q).then((res) => {
      const [fUser, ...rest] = res.docs?.map((doc) => {
        return doc.data() as UserProps;
      });
      if (fUser) {
        setUser(fUser);

        localStorage.setItem("user", JSON.stringify(fUser));
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: UserProps | null = userString
      ? JSON.parse(userString)
      : null;

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdmin({
          uid: user.uid,
          email: user.email,
          displayNavme: user.displayName,
          photoURL: user.photoURL,
        });
        if (localUser) {
          setUser(localUser);
        } else {
          fetchUser(user.uid);
        }
      } else {
        setAdmin({});
        setUser(null);
      }
    });
    // setLoading(false);
    return () => {
      unsub();
    };
  }, []);
  const handleSignIn = () => {
    const googleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          const { displayName, email, photoURL, uid } = result.user;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            router.push("/");
            return;
          } else {
            await setDoc(doc(db, "users", uid), {
              displayName,
              email,
              photoURL,
              uid,
            }).then(() => {
              router.push("/");
            });
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
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  user: UserProps | null;
  handleSignIn: () => void;
  fetchUser: (uid: string) => void;
  logout: () => Promise<void>;
}

export const useAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
