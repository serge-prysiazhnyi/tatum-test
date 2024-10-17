import React, { useState } from 'react';

import { useFetchEthereumAddressBalance } from '../../hooks/useFetchEthereumAddressBalance';

function Form() {
    const [inputValue, setInputValue] = useState(''); // State to hold the input value

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
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.currentTarget.value)
                }
                placeholder="Enter ETH wallet address to get balance"
                style={{
                    padding: '5px',
                    width: '320px',
                    display: 'block',
                    marginBottom: '10px',
                }}
            />
            <button
                onClick={handleSubmit}
                style={{ padding: '5px' }}
                disabled={!inputValue || loading}
                type="submit"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                }}
            >
                Submit
            </button>

            {balance && (
                <p
                    style={{
                        padding: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    {`Balance: ${balance}`}
                </p>
            )}

            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
        </form>
    );
}

export default Form;
