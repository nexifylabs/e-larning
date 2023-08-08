import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const Requirements = ({ requirements }) => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <>
                    <h3>
                        {t('course-page-requirements', {
                            defaultValue: 'Requirements',
                        })}
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: requirements }}
                    ></div>
                </>
            )}
        </>
    );
};

export default Requirements;
