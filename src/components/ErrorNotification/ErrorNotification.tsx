import React from 'react';

import styles from './ErrorNotification.module.css';

interface Props {
    message: string;
}

export const ErrorNotification: React.FC<Props> = ({ message }) =>
    !!message && <div className={styles.error}>{message}</div>;
