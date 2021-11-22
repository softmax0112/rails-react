import type { AppProps } from 'next/app'
import React from 'react'
import { Layout } from '../components/layout/Layout'
import { NavLink } from '../components/NavLink'

import '../styles/tailwind.css'
import { User } from '../types/User.interface'

// prefix `path` values with a leading slash
const navLinks: Array<NavLink> = [
  {
    path: '/',
    name: 'Dashboard',
  },
  {
    path: '/projects',
    name: 'Projects',
  },
  {
    path: '/about',
    name: 'About',
  },
]

const user: User = {
  name: 'Bob Smith',
  email: 'Bobbzy Smithy',
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Layout navLinks={navLinks} user={user} onSignOutClick={() => alert('Sign Out Clicked')}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default CustomApp
