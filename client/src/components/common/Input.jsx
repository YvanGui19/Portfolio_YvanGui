function Input({
    label,
    type = 'text',
    error,
    className = '',
    ...props
  }) {
    const inputStyles = `
      w-full bg-surface-light border border-border rounded-lg px-4 py-3
      text-text text-sm placeholder-text-muted
      transition-all duration-300
      focus:outline-none focus:border-primary focus:shadow-glow
      ${error ? 'border-danger' : ''}
      ${className}
    `

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-text">
            {label}
          </label>
        )}

        {type === 'textarea' ? (
          <textarea className={inputStyles} rows={4} {...props} />
        ) : (
          <input type={type} className={inputStyles} {...props} />
        )}

        {error && (
          <p className="text-danger text-sm">{error}</p>
        )}
      </div>
    )
  }

  export default Input
