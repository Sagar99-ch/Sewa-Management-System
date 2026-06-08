import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("userid", userid.trim())
        .eq("password", password.trim())
        .maybeSingle();

      if (error || !data) {
        alert("Invalid User ID or Password");
        return;
      }

      localStorage.setItem("admin", JSON.stringify(data));

      alert("Login Successful");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Database Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-2xl mb-4">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>

          <h1 className="text-3xl font-bold text-white">Sewa Management</h1>

          <p className="text-gray-300 mt-2 text-sm">Welcome Back Admin</p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label className="text-gray-300 text-sm">User ID</label>

            <input
              type="text"
              placeholder="Enter User ID"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              className="w-full mt-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
