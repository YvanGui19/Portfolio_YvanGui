import { memo } from "react";

// VerrouPass input styles - cyan focus glow
const baseInputStyles = `
  w-full bg-mid-navy border border-slate
  text-white font-sans text-[0.95rem]
  px-4 py-3
  transition-all duration-300
  focus:outline-none focus:border-cyan focus:shadow-[0_0_15px_rgba(1,255,255,0.25)]
  placeholder:text-grey placeholder:font-mono placeholder:text-[0.8rem] placeholder:tracking-wider
  hover:border-lime/50
`;

const dateInputStyles = `
  cursor-text
  [&::-webkit-calendar-picker-indicator]:cursor-pointer
  [&::-webkit-calendar-picker-indicator]:opacity-70
  [&::-webkit-calendar-picker-indicator]:hover:opacity-100
  [&::-webkit-calendar-picker-indicator]:transition-opacity
  [&::-webkit-calendar-picker-indicator]:filter
  [&::-webkit-calendar-picker-indicator]:invert
`;

const Input = memo(function Input({
  label,
  type = "text",
  error,
  hint,
  success,
  className = "",
  name,
  id,
  ...props
}) {
  const inputId = id || name;

  // Build input class based on state - VerrouPass cyan focus
  const inputStateClass = error
    ? "!border-red focus:!border-red focus:!shadow-[0_0_15px_rgba(255,48,48,0.25)] hover:!border-red"
    : success
    ? "border-lime focus:border-cyan focus:shadow-[0_0_15px_rgba(1,255,255,0.25)]"
    : "";

  const isDateType = type === "date" || type === "datetime-local";
  const isSelect = type === "select";
  const isTextarea = type === "textarea";

  const combinedStyles = `${baseInputStyles} ${inputStateClass} ${
    isDateType ? dateInputStyles : ""
  } ${isSelect ? "form-select-marathon cursor-pointer" : ""} ${className}`;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className={`block font-condensed text-[0.75rem] font-semibold tracking-[0.2em] uppercase transition-colors ${
            error ? "text-red" : "text-lime"
          }`}
        >
          {label}
        </label>
      )}

      {isTextarea ? (
        <textarea
          id={inputId}
          name={name}
          className={`${combinedStyles} min-h-[120px] resize-y leading-relaxed`}
          rows={4}
          {...props}
        />
      ) : isSelect ? (
        <select id={inputId} name={name} className={combinedStyles} {...props} />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          className={combinedStyles}
          {...props}
        />
      )}

      {hint && !error && (
        <p className="font-mono text-[0.75rem] text-grey mt-1">// {hint}</p>
      )}

      {error && (
        <p className="font-mono text-[0.75rem] text-red mt-1">// {error}</p>
      )}
    </div>
  );
});

export default Input;
