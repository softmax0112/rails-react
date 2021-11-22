import clsx from 'clsx'

export const ContentSection: React.FC<{ className?: string }> = ({ className, children, ...props }) => {
  return (
    <section className={clsx('max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mx-auto', className)} {...props}>
      {children}
    </section>
  )
}
