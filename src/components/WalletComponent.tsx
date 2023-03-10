import dynamic from 'next/dynamic';

export const WalletComponent = () => {
    
    const ReactUIWalletMultiButtonDynamic = dynamic(
        async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
        { ssr: false }
    );

    return <ReactUIWalletMultiButtonDynamic/>;
};

export default WalletComponent;