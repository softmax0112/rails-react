import clsx from 'clsx'
import Link from 'next/link'

export interface NavLink {
  /** path values should typically be prefixed with a leading slash e.g. `/`. */
  path: string
  /** link text */
  name: string
}

export interface NavLinkProps extends NavLink {
  variant: 'mobile' | 'desktop'
  /** flag to render with alternate styles for current page. */
  isCurrent?: boolean
}

export const NavLink: React.FC<NavLinkProps> = ({ path, name, variant, isCurrent = false }) => {
  const textStyle = 'font-medium text-base'

  switch (variant) {
    case 'mobile':
      return (
        <Link href={path}>
          <a
            className={clsx(
              textStyle,
              'block pl-3 pr-4 py-2 border-l-4',
              isCurrent
                ? 'border-blue-500 hover:border-blue-500 bg-blue-100 text-blue-700 hover:text-blue-700'
                : 'border-transparent text-gray-500 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-100',
            )}
          >
            {name}
          </a>
        </Link>
      )
    case 'desktop':
      return (
        <Link href={path}>
          <a
            className={clsx(
              textStyle,
              'inline-flex items-center px-1 pt-1 border-b-2',
              isCurrent
                ? 'text-blue-700 border-blue-500 hover:border-blue-500'
                : 'border-transparent text-gray-500 hover:border-blue-200',
            )}
          >
            {name}
          </a>
        </Link>
      )
    default:
      return null
  }
}
