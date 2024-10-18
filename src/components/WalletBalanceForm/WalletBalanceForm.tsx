import React, { useState } from 'react';

import { useFetchEthereumAddressBalance } from '../../hooks/useFetchEthereumAddressBalance';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

import styles from './WalletBalanceForm.module.css';

export const WalletBalanceForm = () => {
    const [inputValue, setInputValue] = useState('');

    const { fetchBalance, loading, error, balance } =
        useFetchEthereumAddressBalance();

    const handleSubmit = async () => {
        await fetchBalance(inputValue);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <input
                id="address"
                className={styles.addressInput}
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.currentTarget.value)
                }
                placeholder="Enter ETH wallet address to get balance"
            />

            <button
                onClick={handleSubmit}
                className={styles.submitButton}
                disabled={!inputValue || loading}
                type="submit"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                }}
            >
                {loading ? <LoadingIndicator /> : 'Submit'}
            </button>

            {balance && (
                <p className={styles.balance}>{`Balance: ${balance} ETH`}</p>
            )}

            <ErrorNotification message={error?.message} />
        </form>
    );
};
