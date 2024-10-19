import { FunctionalComponent } from 'preact';

import styles from './ErrorNotification.module.css';

interface Props {
    message: string;
}

export const ErrorNotification: FunctionalComponent<Props> = ({ message }) =>
    !!message && <div className={styles.error}>{message}</div>;
