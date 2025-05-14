import React from 'react'

interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'submit',
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`py-2 text-white dark:text-white rounded-lg w-44 bg-black dark:bg-secondary ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
