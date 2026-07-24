import { Link } from "react-router-dom";
import {Button} from "../components/UI/Button"
import {Input} from "../components/UI/Input";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
    const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const response = await api.post("/signin", formData);

      await login(response.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-5">

      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#17171C] p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-zinc-400">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-amber-400 hover:text-amber-300"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}