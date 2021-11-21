export const MainContentSection: React.FC<{ className?: string }> = ({ className, children, ...props }) => {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  )
}
