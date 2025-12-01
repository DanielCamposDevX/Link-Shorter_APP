import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Shorten, Ranking, Signup } from "./pages/IndexPages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ranking />} />
          <Route path="/shorten" element={<Shorten />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
