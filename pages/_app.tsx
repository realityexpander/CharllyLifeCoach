import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'  // Global styles - overrides bootstrap
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
