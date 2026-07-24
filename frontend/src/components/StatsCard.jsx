export default function StatsCard({
  title,
  value,
  icon,
  color = "bg-amber-400",
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#17171C] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className={`${color} rounded-xl p-3`}>
          {icon}
        </div>
      </div>
    </div>
  );
}