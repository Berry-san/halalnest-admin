interface TextAreaFieldProps {
  label?: string
  placeholder?: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder = 'Enter text...',
  value,
  name,
  onChange,
  rows = 4,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label>{label}</label>}
      <textarea
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="rounded px-4 py-2 border border-gray-300 focus:outline-none"
      />
    </div>
  )
}

export default TextAreaField
