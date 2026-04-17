import { AlertCircle } from 'lucide-react'

type ErrorMessageProps = {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  message = 'Could not load data. Please try again.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <AlertCircle className="w-8 h-8 text-[#e10600]" aria-hidden="true" />
      <p className="text-sm text-[#a1a1aa] max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium text-white bg-[#1a1a1a] border border-[#333333] rounded-lg hover:border-[#e10600] transition-colors duration-200 cursor-pointer"
        >
          Try again
        </button>
      )}
    </div>
  )
}
