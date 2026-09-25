import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, getUserProfile, getCandidateProfile } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile and candidate profile details if token exists
  const loadUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setCandidateProfile(null);
      setLoading(false);
      return;
    }

    try {
      const profileRes = await getUserProfile();
      setUser(profileRes);
      localStorage.setItem("user", JSON.stringify(profileRes));

      if (profileRes.role === "candidate") {
        try {
          const candProfileRes = await getCandidateProfile();
          setCandidateProfile(candProfileRes);
        } catch (e) {
          console.warn("Could not load candidate profile:", e);
        }
      }
    } catch (error) {
      console.error("Profile loading failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login action
  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    if (data.user.role === "candidate") {
      try {
        const candProfileRes = await getCandidateProfile();
        setCandidateProfile(candProfileRes);
      } catch (e) {}
    }
    return data.user;
  };

  // Register action
  const register = async (userData) => {
    const data = await registerUser(userData);
    return data;
  };

  // Logout action
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    setCandidateProfile(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    user,
    candidateProfile,
    loading,
    login,
    register,
    logout,
    loadUser,
    isAuthenticated: !!user,
    isCandidate: user?.role === "candidate",
    isEmployer: user?.role === "employer",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);