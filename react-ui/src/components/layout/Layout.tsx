import React from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { Header } from './sections/Header'
import { Footer } from './sections/Footer'
import { MainContent } from './sections/MainContent'

import type { NavLink } from '../NavLink'
import type { User } from '../../types/User.interface'

export interface LayoutProps {
  navLinks?: Array<NavLink>
  user?: User
  onSignOutClick?: (event: React.MouseEvent) => void
}

export const Layout: React.FC<LayoutProps> = ({ children, user, navLinks, onSignOutClick }) => {
  const innerClassName = 'container mx-auto p-4'

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen w-full flex-col">
        <Header className="bg-blue-50" user={user} navLinks={navLinks} onSignOutClick={onSignOutClick} />
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
