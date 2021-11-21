import { ErrorBoundary } from './ErrorBoundary'
import { Header } from './sections/Header'
import { MainContentSection } from './sections/MainContentSection'
import { Footer } from './sections/Footer'
import type { NavLink } from '../NavLink'
import { MainContent } from './sections/MainContent'

export interface LayoutProps {
  navLinks?: Array<NavLink>
  user?: {
    name: string
    email: string
  }
}

export const Layout: React.FC<LayoutProps> = ({ user, navLinks, children }) => {
  const innerClassName = 'container mx-auto p-4'

  return (
    <div className="flex min-h-screen w-full flex-col">
      <ErrorBoundary>
        <Header className="bg-blue-50" navLinks={navLinks} />
        <MainContent>
          <MainContentSection className="py-8 flex-1">{children}</MainContentSection>
        </MainContent>
        <Footer className="bg-blue-50 shadow" innerClassName={innerClassName} />
      </ErrorBoundary>
    </div>
  )
}
