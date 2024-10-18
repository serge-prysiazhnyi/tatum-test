import { Logo } from '../components/Logo/Logo';
import { WalletBalanceForm } from '../components/WalletBalanceForm/WalletBalanceForm';

export function Home() {
    return (
        <div>
            <Logo />
            <h1>Tatum Hello</h1>
            <WalletBalanceForm />
        </div>
    );
}
