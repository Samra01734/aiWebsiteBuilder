import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/me`,
          { withCredentials: true }
        );

        // ✅ FIX: only user object store karo
        dispatch(setUserData(result.data.user));

      } catch (error) {
        console.log(error);
      }
    };

    getCurrentUser();
  }, [dispatch]);
};

export default useGetCurrentUser;