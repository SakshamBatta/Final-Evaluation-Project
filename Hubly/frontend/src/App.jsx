import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/Home/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Settings from "./pages/settings/Settings";
import ContactCenter from "./pages/contact/ContactCenter";
import Chatbot from "./pages/chatbot/Chatbot";
import { ChatbotProvider } from "./context/ChatbotContext";
import Analytics from "./pages/analytics/Analytics";
import TeamPage from "./pages/team/TeamPage";

function App() {
  return (
    <ChatbotProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/team"
            element={
              <PrivateRoute>
                <TeamPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <ContactCenter />
              </PrivateRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <PrivateRoute>
                <Chatbot />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ChatbotProvider>
  );
}

export default App;
