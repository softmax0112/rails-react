import React, { ErrorInfo } from 'react'

export class ErrorBoundary extends React.Component {
  public state = { hasError: false }

  static getDerivedStateFromError(_: Error) {
    // update state so the next render shows the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // log error to web service e.g. logToService(error, info)
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 my-4 rounded-md bg-white">
          <div className="flex justify-center">
            <h1 className="mb-4 text-lg font-bold text-red-800">Error</h1>
            <p className="text-gray-800">Error loading page</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
