// context/index.tsx
'use client'

import { wagmiAdapter, projectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { bsc } from '@reown/appkit/networks'
import React, { ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up React Query
const queryClient = new QueryClient()

// Metadata for WalletConnect modal
const metadata = {
  name: 'Invincible Read',
  description: 'Web3 knowledge platform',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://invincibleread.com',
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}



// Setup WalletConnect modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId: projectId ?? (() => { throw new Error('projectId is required'); })(),
  networks: [ bsc],
  defaultNetwork: bsc,
  metadata,
  features: {
    analytics: true
  }
})

export default function ContextProvider({
  children,
  cookies
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
