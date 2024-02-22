"use client";
import { createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useGetSchool } from "./hooks/client/useSchool";
const AuthContext = createContext({});

export const UserAuth = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const { data: school } = useGetSchool(params.school as string);

  useEffect(() => {
    console.log(school);
    if (school) {
      Cookies.set("school_id", school._id);
    }
  }, [school]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

interface AuthContextProps {}

export const useUserAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
