export const Button = ({children, type = "button", onClick, className = "", disabled = false,}) =>{
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        rounded-xl
        bg-amber-400
        py-3
        text-lg
        font-semibold
        text-black
        transition-all
        duration-300
        hover:bg-amber-300
        hover:scale-[1.01]
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
}