import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const SignOut = () => {
  useTitle("Sign Out");
  const { signOut } = useAuth();
  useEffect(() => {
    signOut();
  }, [signOut]);
  return <Navigate to="/" />;
};

export default SignOut;
