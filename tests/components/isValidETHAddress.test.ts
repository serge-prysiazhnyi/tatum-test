import { isValidETHAddress } from '../../src/utils/isValidETHAddress';

describe('isValidETHAddress', () => {
    test('should return true for valid Ethereum address', () => {
        const validAddresses = [
            '0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990',
            '0xAABBCCDDEEFF00112233445566778899aabbccdd',
            '0x0000000000000000000000000000000000000000',
            '0x1234567890abcdefABCDEF1234567890abcdefAB',
        ];

        validAddresses.forEach((address) => {
            expect(isValidETHAddress(address)).toBe(true);
        });
    });

    test('should return false for addresses wtesth invalid formats', () => {
        const invalidAddresses = [
            '0x12345',
            '0xGHIJKLMNOPQRSTUVWXYZ1234567890abcdefAB',
            '1234567890abcdefABCDEF1234567890abcdefAB',
            '0x1234567890abcdefABCDEF1234567890abcdefABC',
            '',
            '0x1234567890abcdefABCDEF1234567890abcdefA',
        ];

        invalidAddresses.forEach((address) => {
            expect(isValidETHAddress(address)).toBe(false);
        });
    });

    test('should return false for null, undefined, or non-string values', () => {
        const invalidInputs = [null, undefined, 123, {}, [], true];

        invalidInputs.forEach((input) => {
            expect(isValidETHAddress(input as any)).toBe(false);
        });
    });
});
