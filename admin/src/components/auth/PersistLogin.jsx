import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import Loader from "../modules/loader/loader";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [])

  return (
    <>
      {
        isLoading ? <Loader /> : <Outlet />
      }
    </>
  )
}

export default PersistLogin;
