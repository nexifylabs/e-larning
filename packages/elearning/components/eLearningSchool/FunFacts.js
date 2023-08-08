import baseUrl from '@/utils/baseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const FunFacts = () => {
    const [students, setStudents] = useState(0);
    const [enrolls, setEnrolls] = useState(0);
    const [instructors, setInstractors] = useState(0);
    const [courses, setCourses] = useState(0);

    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fethStats = async () => {
            const url = `${baseUrl}/api/funfacts`;
            const response = await axios.get(url);
            setStudents(response.data.students);
            setEnrolls(response.data.enrolments);
            setInstractors(response.data.instructors);
            setCourses(response.data.courses);
        };

        fethStats();
    }, []);
    return (
        <>
            {isMounted && (
                <div className='funfacts-list' style={{width:"95%", display:"flex", justifyContent:"center"}}>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6'>
                            <div className='single-funfacts-box'>
                                <h3>+4500</h3>
                                <p>
                                    {t('funfacts-first', {
                                        defaultValue: 'Graduated Students',
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-6'>
                            <div className='single-funfacts-box'>
                                <h3>+120</h3>
                                <p>
                                    {t('funfacts-second', {
                                        defaultValue: 'Hours of Content',
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-6'>
                            <div className='single-funfacts-box'>
                                <h3>+400</h3>
                                <p>
                                    {t('funfacts-third', {
                                        defaultValue:
                                            'Courses and consulting services in +38 countries',
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-6'>
                            <div className='single-funfacts-box'>
                                <h3>+15</h3>
                                <p>
                                    {t('funfacts-fourth', {
                                        defaultValue: 'Available Courses',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FunFacts;
