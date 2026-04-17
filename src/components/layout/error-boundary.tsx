import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-24 flex flex-col items-center gap-4 text-center px-4">
          <AlertTriangle className="w-10 h-10 text-[#e10600]" aria-hidden="true" />
          <div>
            <p className="font-heading font-bold text-white text-lg">Something went wrong</p>
            <p className="text-sm text-[#a1a1aa] mt-1">
              An unexpected error occurred. Try refreshing the page.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm text-white border border-[#333333] rounded-lg hover:border-[#e10600] transition-colors duration-200 cursor-pointer"
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
