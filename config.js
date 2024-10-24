import { http, createConfig } from 'wagmi'
import { mainnet, base ,sepolia} from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID 

export const config = createConfig({
  chains: [mainnet,sepolia, base],
  connectors: [
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  },
})
