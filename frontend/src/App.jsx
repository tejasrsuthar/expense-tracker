import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import Header from "./components/ui/Header";

function App() {
  const authUser = true;
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
        <Route path="/transaction/:id" element={<TransactionPage />}></Route>
        {/* <Route path="/*" element={<NotFoundPage />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
