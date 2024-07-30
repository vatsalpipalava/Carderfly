import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setAuth({});
    try {
      await axiosPrivate.get("/user/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
