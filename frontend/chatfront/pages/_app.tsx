import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AuthCtxProvider from '../store/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthCtxProvider>
      <div className='flex flex-col md: flex-row h-full min-h-screen font-sans '>
        <Component {...pageProps} />
      </div>
    </AuthCtxProvider>
  )
}
