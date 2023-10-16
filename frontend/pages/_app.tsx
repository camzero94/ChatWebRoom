import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AuthCtxProvider from '../store/context'
import WebCtxProvider from '../store/websocketContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WebCtxProvider>
      <AuthCtxProvider>
        <div className='flex md: flex-row  min-h-screen font-sans '>
          <Component {...pageProps} />
        </div>
      </AuthCtxProvider>
    </WebCtxProvider>
  )
}
