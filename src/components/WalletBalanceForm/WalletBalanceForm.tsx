import { JSX } from 'preact';
import { useState } from 'preact/hooks';

import { useFetchEthereumAddressBalance } from '../../hooks/useFetchEthereumAddressBalance';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

import styles from './WalletBalanceForm.module.css';

const isValidETHAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const WalletBalanceForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const {
        fetchBalance,
        loading,
        error: fetchError,
        balance,
    } = useFetchEthereumAddressBalance();

    const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError(null);

        if (inputValue && isValidETHAddress(inputValue)) {
            await fetchBalance(inputValue);
        } else {
            setValidationError('Please provide a valid Ethereum address');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                id="address"
                className={styles.addressInput}
                type="text"
                value={inputValue}
                onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => {
                    setInputValue(e.currentTarget.value);
                }}
                placeholder="Enter ETH wallet address to get balance"
            />

            <button
                className={styles.submitButton}
                disabled={!inputValue || loading}
                type="submit"
            >
                {loading ? <LoadingIndicator /> : 'Submit'}
            </button>

            {balance && !validationError && !fetchError && (
                <p className={styles.balance}>{`Balance: ${balance} ETH`}</p>
            )}

            <ErrorNotification message={validationError || fetchError} />
        </form>
    );
};
