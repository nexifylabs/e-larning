import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const WhoIsThisCourseFor = ({ who_is_this_course_for }) => {
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
                        {t('course-page-whoisthiscoursefor', {
                            defaultValue: 'Who this course is for:',
                        })}
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: who_is_this_course_for,
                        }}
                    ></div>
                </>
            )}
        </>
    );
};

export default WhoIsThisCourseFor;
