import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { TatumSDK } from '@tatumio/tatum';

import { WalletBalanceForm } from '../../src/components/WalletBalanceForm/WalletBalanceForm';
import {
    getAddressBalanceResponse,
    mockBalanceValue,
    getAddressBalanceError,
} from '../mocks/getAddressBalanceResponse';

vitest.mock('@tatumio/tatum');

describe('WalletBalanceForm', () => {
    const getBalanceMock = vi.fn();
    const destroyMock = vi.fn();
    const mockETHAddress = '0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990';

    beforeEach(() => {
        getBalanceMock.mockReset();
        destroyMock.mockReset();

        vi.spyOn(TatumSDK, 'init').mockResolvedValue({
            address: {
                getBalance: getBalanceMock,
            },
            destroy: destroyMock,
        });
    });

    afterAll(() => {
        vitest.clearAllMocks();
    });

    const renderComponent = () => {
        const user = userEvent.setup();
        render(<WalletBalanceForm />);

        const addressInput = screen.getByPlaceholderText(
            /enter ETH wallet address to get balance/i
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });
        const loadingIndicator = screen.queryByRole('progressbar');
        const errorMessage = screen.queryByRole('alert');

        return {
            user,
            addressInput,
            submitButton,
            loadingIndicator,
            errorMessage,
        };
    };

    test('should render correct initial form state', () => {
        const { addressInput, submitButton, loadingIndicator, errorMessage } =
            renderComponent();

        expect(addressInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
        expect(loadingIndicator).not.toBeInTheDocument();
        expect(errorMessage).not.toBeInTheDocument();
    });

    test('should enable submit button when form is filled', async () => {
        const { user, addressInput, submitButton } = renderComponent();

        expect(submitButton).toBeDisabled();

        await user.type(addressInput, mockETHAddress);

        expect(addressInput).toHaveValue(mockETHAddress);
    });

    test('should show loading indicator on form submit', async () => {
        getBalanceMock.mockResolvedValue(
            new Promise((resolve) => {
                setTimeout(() => resolve(getAddressBalanceResponse), 1500);
            })
        );
        const { user, addressInput, submitButton } = renderComponent();

        await user.type(addressInput, mockETHAddress);
        await user.click(submitButton);

        expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    });

    test('should display the balance when fetch balance succeeds', async () => {
        getBalanceMock.mockResolvedValue(getAddressBalanceResponse);
        const { user, addressInput, submitButton } = renderComponent();

        await user.type(addressInput, mockETHAddress);
        await user.click(submitButton);

        expect(
            await screen.findByText(
                new RegExp(`Balance: ${mockBalanceValue} ETH`)
            )
        ).toBeInTheDocument();
    });

    test('should hide loading indicator on fetch finish', async () => {
        getBalanceMock.mockResolvedValue(getAddressBalanceResponse);
        const { user, addressInput, submitButton } = renderComponent();

        await user.type(addressInput, mockETHAddress);
        await user.click(submitButton);

        expect(await screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    test('should show validation error if address is not correct', async () => {
        const { user, addressInput, submitButton } = renderComponent();

        await user.type(addressInput, 'foobar');
        await user.click(submitButton);

        expect(
            screen.getByText(/please provide a valid ethereum address/i)
        ).toBeInTheDocument();
    });

    test('should display error when fetch balance fails', async () => {
        getBalanceMock.mockResolvedValue(getAddressBalanceError);
        const { user, addressInput, submitButton } = renderComponent();

        await user.type(addressInput, mockETHAddress);
        await user.click(submitButton);

        expect(await screen.findByText(/failed/i)).toBeInTheDocument();
    });

    test('should clear error when new fetch attempt is made', async () => {
        getBalanceMock.mockResolvedValue(getAddressBalanceError);
        const { user, addressInput, submitButton } = renderComponent();

        await user.type(addressInput, mockETHAddress);
        await user.click(submitButton);

        expect(await screen.findByText(/failed/i)).toBeInTheDocument();

        getBalanceMock.mockResolvedValue(getAddressBalanceResponse);

        await user.click(submitButton);

        expect(await screen.queryByText(/failed/i)).not.toBeInTheDocument();
    });
});
