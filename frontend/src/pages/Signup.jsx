import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import api from "../services/api";

export const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      await api.post("/signup", formData);

      toast.success("Account created successfully!");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-5">

      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#17171C] p-8 shadow-2xl sm:p-10">

        <h1 className="text-4xl font-bold text-white">
          Create your account
        </h1>

        <p className="mt-2 text-zinc-400">
          Organize your todos into collections.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <Input
            label="Name"
            name="name"
            placeholder="Rahul Rana"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-amber-400 hover:text-amber-300"
          >
            Sign In
          </Link>
        </p>

      </div>

    </div>
  );
};