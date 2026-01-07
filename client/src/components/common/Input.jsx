function Input({
  label,
  type = "text",
  error,
  className = "hover:border-primary hover:shadow-glow transition-all duration-300",
  name,
  id,
  ...props
}) {
  const inputId = id || name;

  const baseStyles = `
      w-full bg-surface-light border border-border rounded-lg px-4 py-3
      text-text text-sm placeholder-text-muted
      transition-all duration-300
      focus:outline-none focus:border-primary focus:shadow-glow
      ${error ? "border-danger" : ""}
      ${className}
    `;

  // Styles spécifiques pour les inputs date
  const dateStyles = `
      ${baseStyles}
      cursor-text
      [&::-webkit-calendar-picker-indicator]:cursor-pointer
      [&::-webkit-calendar-picker-indicator]:opacity-70
      [&::-webkit-calendar-picker-indicator]:hover:opacity-100
      [&::-webkit-calendar-picker-indicator]:transition-opacity
      [&::-webkit-calendar-picker-indicator]:filter
      [&::-webkit-calendar-picker-indicator]:invert
    `;

  const isDateType = type === "date" || type === "datetime-local";

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-text">{label}</label>
      )}

      {type === "textarea" ? (
        <textarea id={inputId} name={name} className={baseStyles} rows={4} {...props} />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          className={isDateType ? dateStyles : baseStyles}
          {...props}
        />
      )}

      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
}

export default Input;
