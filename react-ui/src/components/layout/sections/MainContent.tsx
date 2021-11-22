import clsx from 'clsx'

export const MainContent: React.FC<{ className?: string }> = ({ className, children, ...props }) => {
  return (
    <main className={clsx('flex-1', className)} {...props}>
      {children}
    </main>
  )
}
