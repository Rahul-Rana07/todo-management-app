import { Bell, FolderPlus, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onCreateCollection , stats,}) {
  const { user, logout } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

    const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour >= 5 && hour < 12) {
  greeting = "Good Morning";
} else if (hour >= 12 && hour < 17) {
  greeting = "Good Afternoon";
} else if (hour >= 17 && hour < 21) {
  greeting = "Good Evening";
} else {
  greeting = "Good Night";
}

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090B]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        {/* Left */}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-white sm:text-2xl">
                {greeting} 👋
          </h1>

          <p className="truncate text-sm text-zinc-400">
  Welcome back, {user?.name}.
</p>

<p className="mt-1 hidden text-xs text-zinc-500 sm:block">
  {stats?.pending > 0
    ? `You have ${stats.pending} pending ${
        stats.pending === 1 ? "task" : "tasks"
      } today.`
    : "You're all caught up! 🎉"}
</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">

          <button
            onClick={onCreateCollection}
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-3 py-2 font-semibold text-black transition hover:bg-amber-300 sm:px-5 sm:py-3"
          >
            <FolderPlus size={18} />
            <span className="hidden sm:inline">
              New
            </span>
          </button>

          <button className="rounded-full p-2 transition hover:bg-zinc-800 sm:p-3">
            <Bell size={20} />
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 font-bold text-black sm:h-11 sm:w-11">
            {initials}
          </div>

          <button
            onClick={logout}
            className="rounded-full p-2 transition hover:bg-zinc-800 sm:p-3"
          >
            <LogOut size={20} />
          </button>

        </div>
      </div>
    </header>
  );
}