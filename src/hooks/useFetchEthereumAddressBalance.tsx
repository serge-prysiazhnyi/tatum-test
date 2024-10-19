import { Network, TatumSDK, Ethereum } from '@tatumio/tatum';
import { useState, useEffect } from 'preact/hooks';

export const useFetchEthereumAddressBalance = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tatum, setTatum] = useState<Ethereum>(null);
    const [balance, setBalance] = useState('');

    const fetchBalance = async (inputValue: string) => {
        if (!tatum) {
            console.error('Tatum is not initialized');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setBalance('');

            const balance = await tatum.address.getBalance({
                addresses: [inputValue],
            });

            if (balance.status === 'ERROR') {
                throw new Error(balance?.error.message.join(' '));
            }

            const balanceData = balance.data.find(
                (asset) => asset.asset === 'ETH'
            );

            setBalance(balanceData.balance);
        } catch (error) {
            console.log('Something went wrong:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initializeTatumInstance = async () => {
            try {
                const tatumInstance = await TatumSDK.init<Ethereum>({
                    network: Network.ETHEREUM,
                    apiKey: { v4: import.meta.env.VITE_API_KEY },
                    verbose: true,
                });

                setTatum(tatumInstance);
            } catch (error) {
                console.error('Failed to initialize Tatum:', error);
                setError(error);
            }
        };

        initializeTatumInstance();

        return () => {
            if (!!tatum) {
                const cleanup = async () => {
                    await tatum.destroy();
                };

                cleanup();
            }
        };
    }, []);

    return {
        fetchBalance,
        loading,
        error,
        balance,
    };
};
