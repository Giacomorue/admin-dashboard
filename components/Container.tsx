export default function Container({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <div className='w-full'>
      <div className={`max-w-[1280px] mx-auto ${className}`}>
        {children}
      </div>
    </div>
  )
}
