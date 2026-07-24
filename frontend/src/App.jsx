import {Routes , Route} from "react-router-dom";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Collection from "./pages/Collection";
import ProtectedRoute from "./components/ProtectedRoute";



export const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard"
       element={
       <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
      <Route path="/collection/:id"
      element={
        <ProtectedRoute>
            <Collection />
        </ProtectedRoute>
      } />
    </Routes>
  )
}