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
        // 🔥 GET TOKEN FROM LOCAL STORAGE
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const result = await axios.get(
          `${serverUrl}/api/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 🔥 IMPORTANT FIX
            },
          }
        );

        // ✅ SAFE CHECK
        if (result.data) {
          dispatch(setUserData(result.data.user || result.data));
        }

      } catch (error) {
        console.log("GET USER ERROR:", error?.response?.data || error.message);
      }
    };

    getCurrentUser();
  }, [dispatch]);
};

 export default useGetCurrentUser;