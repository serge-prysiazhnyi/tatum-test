import tatumLogo from '../../assets/tatum.jpeg';
import styles from './Logo.module.css';

export const Logo = () => (
    <a className={styles.logo} href="https://tatum.io/" target="_blank">
        <img src={tatumLogo} alt="Preact logo" height="160" width="160" />
    </a>
);
