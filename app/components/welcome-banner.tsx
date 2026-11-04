export const WELCOME_BANNER_TEXT = "Welcome to Work";

export function WelcomeBanner() {
  return (
    <div
      role="banner"
      className="fixed inset-x-0 top-0 z-[9999] bg-zinc-950/90 px-4 py-3 text-center text-lg font-semibold tracking-tight text-amber-500 shadow-md backdrop-blur"
    >
      {WELCOME_BANNER_TEXT}
    </div>
  );
}
