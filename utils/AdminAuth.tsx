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

export const AdminAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [admin, setAdmin] = useState<IAdmin | {} | null>({});
  const [user, setUser] = useState<IAdminFetched | null>(null);
  const router = useRouter();
  const setCookies = (role: string) => {
    Cookies.set("role", role);
  };
  const clearRoleCookie = () => {
    Cookies.remove("role");
  };
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
      setCookies(fUser.role);
    } else {
      setUser(null);
      setAdmin(null);
    }
  };

  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("administrator");
    const localUser: IAdminFetched | null = userString
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
          setCookies(localUser.role);
          setUser(localUser);
        } else {
          console.log(user);
          fetchUser(user.uid);
        }
      } else {
        setAdmin(null);
        setUser(null);
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
    localStorage.removeItem("administrator");
    clearRoleCookie();
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
  user: IAdmin;
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
