import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AxiosConfig from "../util/AxiosConfig";
import { ApiEndpoints } from "../util/ApiEndpoints";
import { AppContext } from "../context/AppContext";

const useUser = () => {
  const navigate = useNavigate();
  const { user, setUser, clearUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const response = await AxiosConfig.get(ApiEndpoints.GET_USER_INFO);

        if (mounted && response.data) {
          const { fullName, email ,profileImageUrl } = response.data;
          setUser({ fullName, email,profileImageUrl });
          console.log("User fetched:", { fullName, email });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        if (mounted && error.response?.status === 401) {
          clearUser();
          navigate("/login");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token && !user) fetchUser(); // ✅ Only call if user not already set
    else setLoading(false);

    return () => {
      mounted = false;
    };
    // Run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading };
};

export default useUser;
