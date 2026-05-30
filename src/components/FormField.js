import React from 'react';
import './FormField.css';

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  fieldState, // 'idle' | 'error' | 'valid'
  required,
  hint,
  children, // for select/custom
  as = 'input',
}) {
  const inputClass = [
    'ff-input',
    fieldState === 'error' ? 'ff-input--error' : '',
    fieldState === 'valid' ? 'ff-input--valid' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="ff-root">
      <label className="ff-label" htmlFor={name}>
        {label}
        {required && <span className="ff-req" aria-hidden="true"> *</span>}
      </label>

      <div className="ff-control">
        {as === 'select' ? (
          <select
            id={name}
            name={name}
            className={inputClass}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={fieldState === 'error'}
            aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
          >
            {children}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            className={inputClass}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="off"
            aria-invalid={fieldState === 'error'}
            aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
          />
        )}

        {fieldState === 'valid' && (
          <span className="ff-icon ff-icon--valid" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
        {fieldState === 'error' && (
          <span className="ff-icon ff-icon--error" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </span>
        )}
      </div>

      {error && (
        <p id={`${name}-error`} className="ff-error" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${name}-hint`} className="ff-hint">
          {hint}
        </p>
      )}
    </div>
  );
}
