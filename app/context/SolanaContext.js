import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

const cluster = process.env.SOLANA_CLUSTER;
const network =
  cluster === 'mainnet'
    ? WalletAdapterNetwork.Mainnet
    : WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);
const commitment = process.env.SOLANA_COMMITMENT;
const config = { commitment };

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

export function SolanaProvider({ children }) {
  return (
    <ConnectionProvider config={config} endpoint={endpoint}>
      <WalletProvider autoConnect wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
