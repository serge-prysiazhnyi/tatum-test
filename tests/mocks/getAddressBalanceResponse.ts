export const mockBalanceValue = '3.602019811542752199';

export const getAddressBalanceResponse = {
    status: 'SUCCESS',
    data: [
        {
            address: '0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990',
            asset: 'ETH',
            balance: mockBalanceValue,
            decimals: 18,
            type: 'native',
        },
        {
            address: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990',
            asset: 'claim rewards on pooledeth.us',
            balance: '1',
            lastUpdatedBlockNumber: 20881054,
            tokenAddress: '0xb158eacfbf605b30e6c3a4315090f2fe4a212478',
            tokenId: '0',
            type: 'multitoken',
        },
        {
            address: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990',
            asset: 'USD0 [www.usual.finance]',
            balance: '1398',
            decimals: 18,
            lastUpdatedBlockNumber: 20650355,
            tokenAddress: '0x939a92e82a4facffe8ee681428f4237b3cc29308',
            type: 'fungible',
        },
    ],
};

export const getAddressBalanceError = {
    status: 'ERROR',
    error: { message: ['Failed to fetch balance'] },
};
