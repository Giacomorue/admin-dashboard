"use client"

interface ButtonProps{
  children: React.ReactNode
  full?: boolean
  big?: boolean
  outline?: boolean
  disabled?: boolean
  center?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  white?: boolean
}

export default function Button({
  children, center, full, outline, big, disabled, onClick, className, white
}: ButtonProps) {

  const colorClass = `
    ${outline && !white && "border border-red text-red hover:bg-red hover:text-gray-100"}
    ${outline && white && "border border-gray-50 text-gray-50 hover:bg-gray-50 hover:text-lightblack"}
    ${!outline && !white && `bg-red text-gray-50 border border-red`}
    ${!outline && white && `bg-gray-50 text-lightblack border border-gray-50`}
  `

  return (
    <div className={`${center && "flex flex-row justify-center"}`}>
      <button
        className={`${full && "w-full"} py-2 ${big && !full ? "px-5" : "px-3"} ${colorClass} rounded-lg hover:opacity-80 hover:border-opacity-80 transition disabled:cursor-not-allowed disabled:opacity-25 text-md font-medium ${className}`}
        disabled={disabled}
        onClick={onClick}
    >
      {children}
    </button>
    </div>
    
  )
}
