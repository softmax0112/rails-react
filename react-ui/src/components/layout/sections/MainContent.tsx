export const MainContent: React.FC<{ className?: string }> = ({ className, children, ...props }) => {
  return (
    <main className={className} {...props}>
      {children}
    </main>
  )
}
