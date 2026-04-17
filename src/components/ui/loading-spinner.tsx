type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const sizeMap = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }

export function LoadingSpinner({ size = 'md', label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" role="status">
      <div
        className={`${sizeMap[size]} border-2 border-[#222222] border-t-[#e10600] rounded-full animate-spin`}
        aria-hidden="true"
      />
      <span className="text-sm text-[#a1a1aa]">{label}</span>
    </div>
  )
}
