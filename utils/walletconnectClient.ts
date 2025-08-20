// utils/walletconnectClient.ts
import { Web3Wallet } from '@walletconnect/web3wallet'
import { Core } from '@walletconnect/core'

export let web3wallet: InstanceType<typeof Web3Wallet>

export const initWalletConnect = async () => {
  const core = new Core({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! })
  web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: 'Invincible Read',
      description: 'Private Sale Platform',
      url: 'https://invincible.read',
      icons: ['https://invincible.read/icon.png'],
    },
  })
}
