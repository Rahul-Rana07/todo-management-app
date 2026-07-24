export const Input =({label, name, type = "text", placeholder, value, onChange, error, required = false,}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full rounded-xl border bg-[#0D0D10]
          px-4 py-3 text-white outline-none transition-all duration-300
          placeholder:text-zinc-500
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-zinc-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          }
        `}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}