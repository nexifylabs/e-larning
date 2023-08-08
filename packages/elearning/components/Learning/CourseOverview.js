import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const CourseOverview = ({ overview }) => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='courses-details-desc-style-two'>
                    <h3>
                        {t('course-overview-about', {
                            defaultValue: 'About this course',
                        })}
                    </h3>
                    <div dangerouslySetInnerHTML={{ __html: overview }}></div>
                </div>
            )}
        </>
    );
};

export default CourseOverview;
