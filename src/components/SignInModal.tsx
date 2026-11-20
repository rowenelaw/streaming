import { useEffect, useState } from 'react';
import { LogIn, X } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  signedInEmail: string | null;
  onClose: () => void;
  onSignIn: (email: string) => void;
  onSignOut: () => void;
}

export function SignInModal({
  isOpen,
  signedInEmail,
  onClose,
  onSignIn,
  onSignOut,
}: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    setError(null);
    onSignIn(trimmed);
    setPassword('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl border border-white/10 bg-[#161619] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sign in dialog"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#111113] text-white hover:bg-[#232329] cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <span className="font-display text-2xl font-extrabold tracking-tight text-[#FDBE11]">
          viu
        </span>

        {signedInEmail ? (
          <div className="mt-4">
            <h2
              id="signin-modal-title"
              className="font-display text-2xl font-bold text-white"
            >
              Signed In
            </h2>
            <p className="mt-2 text-sm text-[#D4D4D8]">
              Active account: <span className="font-semibold text-white">{signedInEmail}</span>
            </p>
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="rounded-md border border-white/15 bg-[#232329] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2E2E36] cursor-pointer"
              >
                Sign Out
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-[#FDBE11] px-5 py-2 text-sm font-bold text-[#111113] hover:bg-[#FFD043] cursor-pointer"
              >
                Continue Watching
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3">
            <h2
              id="signin-modal-title"
              className="font-display text-2xl font-bold text-white"
            >
              Sign in to Viu Singapore
            </h2>
            <p className="mt-1 text-sm text-[#A1A1AA]">
              Sync your watchlist, watch history, and subtitles across devices.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="viu-signin-email"
                  className="block text-xs font-semibold text-[#D4D4D8] mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="viu-signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  autoFocus
                  className="w-full rounded-md border border-white/10 bg-[#111113] px-3.5 py-2.5 text-sm text-white placeholder-[#71717A] focus:border-[#FDBE11] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="viu-signin-password"
                  className="block text-xs font-semibold text-[#D4D4D8] mb-1.5"
                >
                  Password
                </label>
                <input
                  id="viu-signin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-white/10 bg-[#111113] px-3.5 py-2.5 text-sm text-white placeholder-[#71717A] focus:border-[#FDBE11] focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="mt-3 text-xs font-medium text-[#FDBE11]">{error}</p>
            )}

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#FDBE11] px-5 py-2.5 text-sm font-extrabold text-[#111113] hover:bg-[#FFD043] transition-colors cursor-pointer"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>Sign In</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
