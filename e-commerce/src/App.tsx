import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/HomePage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path ="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App;
