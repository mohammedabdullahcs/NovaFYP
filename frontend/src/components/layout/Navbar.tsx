import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  { label: "Discover", href: "/app" },
  { label: "Dashboard", href: "/app/dashboard" },
  { label: "Chatbot", href: "/app/chatbot" },
  { label: "Profile", href: "/app/profile" }
];

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (isMounted) {
        setUserEmail(data.user?.email ?? null);
      }
    };

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const initials = useMemo(() => {
    if (!userEmail) {
      return "NA";
    }
    return userEmail.slice(0, 2).toUpperCase();
  }, [userEmail]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-base-900/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/app" className="text-text-100 font-display text-xl">
          NovaFYP Advisor
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive
                    ? "text-brand-400"
                    : "text-text-200 hover:text-text-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          {userEmail ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-text-200 hover:text-text-100"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/#auth"
              className="text-xs text-text-200 hover:text-text-100"
            >
              Sign In (optional)
            </Link>
          )}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xs font-semibold text-white">
            {initials}
          </div>
        </div>
      </div>
    </nav>
  );
}
