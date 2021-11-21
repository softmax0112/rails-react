import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import { NavLink } from '../../NavLink'

const LogoPlaceholder: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-8 p-4 w-auto text-sm uppercase rounded-md bg-blue-200 text-blue-600">
      <div className="block lg:hidden">LOGO</div>
      <div className="hidden lg:block">LOGO_FULL</div>
    </div>
  )
}

const AvatarPlaceholder: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <div
      className={clsx(
        'flex justify-center items-center rounded-full bg-blue-200 text-sm uppercase',
        isMobile ? 'h-10 w-10' : 'h-8 w-8',
      )}
    >
      <XIcon className="h-4 w-4 text-blue-600" aria-hidden="true" />
    </div>
  )
}

// prefix `path` values with a leading slash
const links: Array<NavLink> = [
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

const settingsLinks: Array<NavLink & { action?: () => void }> = [
  {
    path: '/',
    name: 'Sign Out',
    action: () => alert('Sign Out Action'),
  },
]

const DesktopNavBar: React.FC<{ currentPath: string }> = ({ currentPath }) => {
  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {links.map((link) => (
        <NavLink
          key={`${link.path}/${link.name}`}
          path={link.path}
          name={link.name}
          variant="desktop"
          isCurrent={link.path === currentPath}
        />
      ))}
    </div>
  )
}

export interface HeaderProps {
  className?: string
  navLinks?: Array<NavLink>
}

export const Header: React.FC<HeaderProps> = ({ className, navLinks }) => {
  const router = useRouter()

  return (
    <Disclosure as="nav" className={className}>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <LogoPlaceholder />
                </div>
                <DesktopNavBar currentPath={router.pathname} />
              </div>
              {/* desktop alerts icon */}
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="bg-blue-50 p-1 rounded-full text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    alert('notifications button click')
                  }}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* desktop profile/settings menu (click user avatar to activate dropdown) */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <span className="sr-only">Open user menu</span>
                          <AvatarPlaceholder isMobile={false} />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {settingsLinks.map((link) => (
                            <Menu.Item key={`${link.path}-${link.name}`}>
                              {({ active }) => (
                                <a
                                  href={link.path}
                                  className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  onClick={(event: React.MouseEvent) => {
                                    event.preventDefault()
                                    if (link.action && typeof link.action === 'function') {
                                      link.action()
                                    } else {
                                      alert(`Menu > ${link.name} link click`)
                                    }
                                  }}
                                >
                                  {link.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
              {/* mobile menu toggle button */}
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-blue-500 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main navigation menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* expanded mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            {/* mobile navigation links */}
            <div className="pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  path={link.path}
                  name={link.name}
                  variant="mobile"
                  isCurrent={link.path === router.pathname}
                />
              ))}
            </div>
            {/* mobile user profile avatar + alerts */}
            <div className="pt-4 pb-3 border-t-2 border-blue-100">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <AvatarPlaceholder isMobile />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-700">Bobby Smith</div>
                  <div className="text-sm font-medium text-gray-500">bobby@example.com</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-transparent hover:bg-blue-100 p-1 rounded-full text-blue-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    alert('notifications button click')
                  }}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* mobile profile/settings menu links */}
              <div className="mt-3 space-y-1">
                {settingsLinks.map((link) => (
                  <a
                    key={`${link.path}-${link.name}`}
                    href={link.path}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-blue-500 hover:bg-blue-100"
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      if (link.action && typeof link.action === 'function') {
                        link.action()
                      } else {
                        alert(`Menu > ${link.name} link click`)
                      }
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
