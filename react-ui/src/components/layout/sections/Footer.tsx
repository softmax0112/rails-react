import clsx from 'clsx'

export const Footer: React.FC<{ className?: string; innerClassName?: string }> = ({ className, innerClassName }) => {
  return (
    <footer className={clsx('bg-blue-50', className)}>
      <div className={clsx('max-w-7xl mx-auto text-center py-4', innerClassName)}>
        <a
          href="https://github.com/firxworx/rails-api-react-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm underline leading-none"
        >
          https://github.com/firxworx/rails-api-react-ui
        </a>
      </div>
    </footer>
  )
}
