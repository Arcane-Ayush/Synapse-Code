import { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/auth";

export function LoginModal({ open, onClose }) {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (!open) return null;
  const modal = (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-black/70 border border-white/10 rounded-2xl p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-2">Sign in</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use your Google account to continue.
        </p>
        {error && (
          <div className="mb-4 text-sm text-red-400">{error}</div>
        )}
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-xl bg-white text-black font-medium disabled:opacity-60"
            disabled={busy}
            onClick={async () => {
              setError("");
              setBusy(true);
              const result = await login();
              setBusy(false);
              if (!result?.ok) {
                const reason = String(result?.reason || "");
                if (reason === "missing_env") {
                  setError(
                    "Auth is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
                  );
                } else if (
                  reason.includes("Unsupported provider") &&
                  reason.includes("not enabled")
                ) {
                  setError(
                    "Google provider is disabled in Supabase. Enable it under Authentication → Providers → Google, then add your Google OAuth Client ID/Secret and set Site URL to http://localhost:5173 with redirect URL shown.",
                  );
                } else {
                  setError("Sign-in failed. Please try again.");
                }
              } else {
                onClose?.();
              }
            }}
          >
            {busy ? "Connecting…" : "Continue with Google"}
          </button>
          <button
            className="px-4 py-2 rounded-xl border border-white/20 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          If using preview on http://localhost:4173, add it to Supabase
          Authentication allowed URLs as well.
        </div>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
}

export default LoginModal;
