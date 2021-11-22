import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { UserIcon } from '@heroicons/react/solid'

import { NavLink } from '../../NavLink'
import { LayoutProps } from '../Layout'

const LogoPlaceholder: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-8 p-4 font-normal w-auto text-sm uppercase rounded-md bg-blue-200 text-blue-600">
      <div className="block lg:hidden">SM LOGO</div>
      <div className="hidden lg:block">FULL WIDTH LOGO</div>
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
      <UserIcon className="h-4 w-4 text-blue-600" aria-hidden="true" />
    </div>
  )
}

const DesktopNavBar: React.FC<{ currentPath: string; navLinks?: LayoutProps['navLinks'] }> = ({
  currentPath,
  navLinks,
}) => {
  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {navLinks?.map((link) => (
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

const MobileNavMenu: React.FC<{
  currentPath: string
  user?: LayoutProps['user']
  navLinks?: LayoutProps['navLinks']
  onSignOutClick?: LayoutProps['onSignOutClick']
}> = ({ currentPath, user, navLinks, onSignOutClick }) => {
  return (
    <>
      <div className="pt-2 pb-3 space-y-1">
        {navLinks?.map((link) => (
          <NavLink
            key={`${link.path}${link.name}`}
            path={link.path}
            name={link.name}
            variant="mobile"
            isCurrent={link.path === currentPath}
          />
        ))}
      </div>
      {user && (
        <>
          <div className="py-4 border-t border-b border-blue-100">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <AvatarPlaceholder isMobile />
              </div>
              <div className="ml-3 flex-1">
                <div className="text-base font-medium text-gray-700">{user.name}</div>
                <div className="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
              {onSignOutClick && typeof onSignOutClick === 'function' && (
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-base font-medium rounded-md"
                  onClick={onSignOutClick}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export interface HeaderProps {
  className?: string
  user?: LayoutProps['user']
  navLinks?: LayoutProps['navLinks']
  onSignOutClick?: LayoutProps['onSignOutClick']
}

export const Header: React.FC<HeaderProps> = ({ className, user, navLinks, onSignOutClick }) => {
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
                <DesktopNavBar currentPath={router.pathname} navLinks={navLinks} />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-300">
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
                          {onSignOutClick && typeof onSignOutClick === 'function' && (
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={clsx(
                                    'block w-full px-4 py-2 text-sm text-left text-gray-700',
                                    active ? 'bg-gray-100' : '',
                                  )}
                                  onClick={onSignOutClick}
                                >
                                  Sign Out
                                </button>
                              )}
                            </Menu.Item>
                          )}
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
          <Disclosure.Panel className="sm:hidden">
            <MobileNavMenu
              currentPath={router.pathname}
              user={user}
              navLinks={navLinks}
              onSignOutClick={onSignOutClick}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
