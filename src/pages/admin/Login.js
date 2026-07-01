import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../store/portfolioApi";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signIn, { isLoading }] = useSignInMutation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signIn({ email, password }).unwrap();
      login(res.token);
      sessionStorage.setItem("admin_gate_passed", "true");
      navigate("/admin");
    } catch (err) {
      setError(err.data?.error || err.data?.message || "Invalid credentials");
    }
  };
  React.useEffect(() => {
    let input = "";
    const target = process.env.REACT_APP_EXIT_TRIGGER_WORD || "exit";
    const handleKeyDown = (e) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA" ||
          document.activeElement.isContentEditable)
      ) {
        return;
      }
      if (e.key && e.key.length === 1) {
        input += e.key.toLowerCase();
        if (input.length > target.length) {
          input = input.substring(input.length - target.length);
        }
        if (input === target) {
          window.location.href = "/";
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    let taps = 0;
    let timeout;
    const triggerText = process.env.REACT_APP_EXIT_LOGIN_TRIGGER_TEXT || "admin@portfolio:~";
    const tapCount = parseInt(process.env.REACT_APP_MOBILE_TAP_COUNT, 10) || 5;

    const handleGlobalClick = (e) => {
      if (e.target && e.target.textContent === triggerText) {
        taps++;
        if (timeout) clearTimeout(timeout);
        if (taps >= tapCount) {
          window.location.href = "/";
          taps = 0;
          return;
        }
        timeout = setTimeout(() => {
          taps = 0;
        }, 2000);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="bg-bg-secondary border border-border rounded-window w-full max-w-sm">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-xs text-text-muted select-none">
            admin@portfolio:~
          </span>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h1 className="font-mono font-medium text-text-primary text-lg">Sign in</h1>
          {error && <p className="text-sm text-red-400 font-mono">{error}</p>}
          <div>
            <label className="font-mono text-xs text-text-muted block mb-1">email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              required
            />
          </div>
          <div>
            <label className="font-mono text-xs text-text-muted block mb-1">password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-primary border border-border rounded-card px-3 py-2 text-sm text-text-primary font-mono outline-none focus:border-accent-primary"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full px-4 py-2 rounded-card bg-accent-primary text-bg-primary font-mono text-sm font-medium hover:brightness-110 disabled:opacity-50">
            {isLoading ? "signing in..." : "sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
