import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingState from "@/components/common/LoadingState";
import { supabase } from "@/lib/supabaseClient";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) {
        return;
      }
      if (!data.user) {
        router.replace("/");
        return;
      }
      setCheckingAuth(false);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace("/");
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-base-900 text-text-200 flex items-center justify-center">
        <LoadingState message="Checking your session..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-900 text-text-200">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
      <Footer />
    </div>
  );
}
