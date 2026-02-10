import { useEffect, useState } from "react";
import type { NextRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export function useProfileAuth(router: NextRouter) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (isMounted) {
        setUserEmail(data.user?.email ?? null);
      }
    };

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    setDeleteError("");
    setDeleteSuccess("");

    const confirmed = window.confirm(
      "This will permanently delete your account. Continue?"
    );
    if (!confirmed) {
      return;
    }

    setDeleteLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) {
        setDeleteError("No active session found.");
        return;
      }

      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setDeleteError(payload?.error || "Failed to delete account.");
        return;
      }

      await supabase.auth.signOut();
      setDeleteSuccess("Account deleted successfully.");
      router.push("/");
    } catch {
      setDeleteError("Failed to delete account. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    userEmail,
    deleteLoading,
    deleteError,
    deleteSuccess,
    handleLogout,
    handleDeleteAccount
  };
}
