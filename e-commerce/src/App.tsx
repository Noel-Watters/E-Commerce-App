import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/HomePage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import ProductEditPage from "./pages/ProductEditPage";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path ="/login" element={<Login />} />
          <Route path ="/Profile/:id" element={<ProfilePage />} />
          <Route path = "/Product/:id" element={<ProductEditPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App;
