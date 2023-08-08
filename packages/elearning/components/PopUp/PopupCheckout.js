import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './PopupCheckout.module.css'; // Import the CSS file

const PopupCheckout = ({ onClose }) => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = () => {
        onClose();
    };

    return (
        <>
            {isMounted && (
                <>
                    <div className={styles.overlay} onClick={onClose}></div>
                    <div className={styles.popup}>
                        <div className={styles.popupContent}>
                            <p className={styles.textoGrande}>
                                {t('popupcheckout-p1', {
                                    defaultValue:
                                        'Before proceeding with the purchase, it is important that you take into account that the email you use during the process will be the one assigned to the purchased course. Likewise, it is essential that you check your email once the purchase is complete, since there you will receive all the necessary information to access the course. Do not forget to check your spam or junk mail folder in case you do not receive the mail in your inbox.',
                                })}
                            </p>
                            <p className={styles.subtitulo}>
                                {t('popupcheckout-p2', {
                                    defaultValue:
                                        'Any inconvenience communicate to WhatsApp that is on the main page.',
                                })}
                            </p>
                        </div>
                        <div className={styles.popupButtons}>
                            <button
                                className={styles.button}
                                onClick={handleSubmit}
                            >
                                {t('popupcheckout-btn', {
                                    defaultValue: 'Keep buying',
                                })}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default PopupCheckout;
