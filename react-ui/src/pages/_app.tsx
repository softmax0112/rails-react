import type { AppProps } from 'next/app'
import { Layout } from '../components/layout/Layout'

import '../styles/tailwind.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default CustomApp
