import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import LottieWrapper from "@/components/common/LottieWrapper";
import { supabase } from "@/lib/supabaseClient";

const authLottieUrl =
  "https://assets9.lottiefiles.com/packages/lf20_ydo1amjm.json";

type AuthMode = "signin" | "signup";

export default function AuthSection() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setInfo("");

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError("Supabase env vars are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        if (data.session) {
          router.push("/app");
        } else {
          setInfo("Check your email to confirm your account.");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
        router.push("/app");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="auth" className="px-6 py-16">
      <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="section-title">Start your discovery</h2>
          <p className="text-text-200 mt-3">
            Create an account or sign in to unlock personalized ideas, smart
            recommendations, and the NovaFYP Advisor chatbot.
          </p>
          <div className="mt-8 flex gap-3">
            {(["signin", "signup"] as AuthMode[]).map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 rounded-full text-sm transition ${
                  mode === item
                    ? "bg-brand-500 text-white"
                    : "bg-white/5 text-text-200"
                }`}
                onClick={() => setMode(item)}
              >
                {item === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl input-surface text-text-100"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl input-surface text-text-100"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {mode === "signup" ? (
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-xl input-surface text-text-100"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            ) : null}
            {error ? <p className="text-accent-500 text-sm">{error}</p> : null}
            {info ? <p className="text-brand-400 text-sm">{info}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-400 text-white px-6 py-3 rounded-xl transition shadow-glow flex items-center justify-center gap-3"
            >
              {loading ? "Please wait..." : "Continue"}
              <span className="w-6 h-6">
                <LottieWrapper
                  animationUrl={authLottieUrl}
                  className="w-6 h-6"
                />
              </span>
            </button>
          </form>
        </div>
        <motion.div
          className="flex-1 w-full max-w-xs"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <LottieWrapper animationUrl={authLottieUrl} className="w-full" />
        </motion.div>
      </div>
    </section>
  );
}
