import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import ProductManagementPage from "./pages/ProductManagmentPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ProtectedRoute from "./components/PortectedRoute";

const queryClient = new QueryClient();

function App() {
  const user = useSelector((state: RootState) => state.user.user); // Get the logged-in user from Redux

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path={`/profile/${user?.id}`}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/manage"
            element={
              <ProtectedRoute>
                <ProductManagementPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
