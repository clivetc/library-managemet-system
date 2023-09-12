import { getUserById } from "@/services/api/service/getUser";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useQuery } from "react-query";

interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { data, isLoading, isFetching } = useQuery(
    ["user-data", userId],
    () => getUserById(userId), // Pass userId directly as the argument
    {
      enabled: !!userId,
    },
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && userId) {
      setUser(data); // Set user data from the query result
    }
  }, [data]); // Include data in the dependency array

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
