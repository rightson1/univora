"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useGetSchool } from "./hooks/client/useSchool";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth2 as auth } from "./firebase";
import { IFUser, IUser, IUserFetched } from "@/types/client";
import axios from "axios";
import { useCustomToast } from "@/components/helpers/functions";
const AuthContext = createContext({});

export const UserAuth = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const router = useRouter();
  const { data: school } = useGetSchool(params.school as string);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { customToast } = useCustomToast();
  const [user, setUser] = useState<IUserFetched | null>(null);
  const [fUser, setFUser] = useState<IFUser | {} | null>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const provider = new GoogleAuthProvider();

  const fetchUser = async (uid: string) =>
    await axios.get(`/api/client/users?uid=${uid}`).then((res) => {
      const user = res.data;
      if (user) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(user));
        setFUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        localStorage.removeItem("user");
        setUser(null);
        setFUser(null);
      }
    });

  useEffect(() => {
    if (fUser && (fUser as IFUser)?.uid) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [fUser]);
  useEffect(() => {
    if (school) {
      const _id = school._id;
      _id && Cookies.set("school_id", _id);
    }
  }, [school]);

  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: IUserFetched | null = userString
      ? JSON.parse(userString)
      : null;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (localUser?.uid === user.uid) {
          setFUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          setUser(localUser);
        } else {
          fetchUser(user.uid).catch((err) => {
            if (err.response.status === 404) {
              console.log("User does not exist");
            }
          });
        }
      } else {
        setFUser(null);
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const handleSignIn = async () => {
    customToast({
      func: async () => {
        await signInWithPopup(auth, provider).then(async (result) => {
          const { displayName, email, uid } = result.user;
          if (displayName && email && uid) {
            {
              const data: IUser = {
                uid: uid,
                email: email,
                school: Cookies.get("school_id")!,
                displayName,
                status: "active",
              };
              await axios.post("/api/client/users", data);
            }
          } else {
            throw new Error("Could not sign in");
          }
        });
      },
      suc: "Signed in successfully",
      sfunc: () => window.location.reload(),
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
        authModalOpen,
        setAuthModalOpen,
        handleSignIn,
        fUser,
        fetchUser,
        user,
        logout,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  handleSignIn: () => Promise<void>;
  fUser: IFUser | null;
  fetchUser: (uid: string) => void;
  logout: () => Promise<void>;
  handleGoogleLogin: () => void;
  loggedIn: boolean;
  user: IUserFetched | null;
}

export const useUser = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
