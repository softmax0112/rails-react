import clsx from 'clsx'

export const Footer: React.FC<{ className: string; innerClassName: string }> = ({ className, innerClassName }) => {
  return (
    <footer className={className}>
      <div className={clsx(innerClassName, 'text-center')}>
        <a
          href="https://firxworx.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline leading-none"
        >
          https://firxworx.com
        </a>
      </div>
    </footer>
  )
}
