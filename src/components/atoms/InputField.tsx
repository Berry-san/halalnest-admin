// components/atoms/InputField.tsx
import React from 'react'

interface InputFieldProps {
  label?: string
  placeholder?: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  disabled?: boolean
  className?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = 'Enter text...',
  value,
  name,
  onChange,
  type = 'text',
  disabled,
  className,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-gray-500">{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-gray-500 border border-gray-300 rounded focus:outline-none ${className}`}
        disabled={disabled}
      />
    </div>
  )
}

export default InputField
