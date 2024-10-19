import { JSX } from 'preact';
import { useState } from 'preact/hooks';

import { useFetchEthereumAddressBalance } from '../../hooks/useFetchEthereumAddressBalance';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

import styles from './WalletBalanceForm.module.css';

export const WalletBalanceForm = () => {
    const [inputValue, setInputValue] = useState('');

    const { fetchBalance, loading, error, balance } =
        useFetchEthereumAddressBalance();

    const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetchBalance(inputValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="address"
                className={styles.addressInput}
                type="text"
                value={inputValue}
                onChange={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    setInputValue(e.currentTarget.value)
                }
                placeholder="Enter ETH wallet address to get balance"
            />

            <button
                className={styles.submitButton}
                disabled={!inputValue || loading}
                type="submit"
            >
                {loading ? <LoadingIndicator /> : 'Submit'}
            </button>

            {balance && (
                <p className={styles.balance}>{`Balance: ${balance} ETH`}</p>
            )}

            <ErrorNotification message={error} />
        </form>
    );
};
