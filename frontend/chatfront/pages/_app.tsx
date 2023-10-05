import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AuthCtxProvider from '../store/context'
import WebCtxProvider from '../store/websocketContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthCtxProvider>
      <WebCtxProvider>
        <div className='flex md: flex-row h-full min-h-screen font-sans '>
          <Component {...pageProps} />
        </div>
      </WebCtxProvider>
    </AuthCtxProvider>
  )
}
