import React, { useEffect, useState } from 'react';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import { useRouter } from 'next/router';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';
import CourseOverview from '@/components/Learning/CourseOverview';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';

const Index = ({ user }) => {
    const [course, setCourse] = useState({});
    const [roomName, setRoomName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [call, setCall] = useState(false);

    const router = useRouter();
    const { slug } = router.query;

    const handleStartCall = (e) => {
        e.preventDefault();
        if (roomName && displayName) setCall(true);
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const url = `${baseUrl}/api/courses/course?slug=${slug}`;
                const res = await axios.get(url);
                setCourse(res.data.course);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourse();
    }, [slug]);

    return (
        <>
            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            <div className='ptb-100 video-area'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-12 col-md-12'>
                            <div className='video-content'>
                                {call ? (
                                    <div className='iframe-container'>
                                        <iframe
                                            width='100%'
                                            height='600'
                                            src={`https://www.youtube.com/embed/${roomName}`}
                                            frameBorder='0'
                                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <form className='row row-cols-lg-auto g-3 align-items-center'>
                                        <div className='col-12'>
                                            <input
                                                id='room'
                                                type='text'
                                                placeholder='Room Name'
                                                value={roomName}
                                                onChange={(e) =>
                                                    setRoomName(e.target.value)
                                                }
                                                className='form-control'
                                                required
                                            />
                                        </div>
                                        <div className='col-12'>
                                            <input
                                                id='name'
                                                type='text'
                                                placeholder='Display Name'
                                                value={displayName}
                                                onChange={(e) =>
                                                    setDisplayName(
                                                        e.target.value
                                                    )
                                                }
                                                className='form-control'
                                                required
                                            />
                                        </div>
                                        <div className='col-12'>
                                            <button
                                                onClick={handleStartCall}
                                                type='submit'
                                                className='default-btn'
                                            >
                                                <i className='flaticon-user'></i>{' '}
                                                Start / Join
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <CourseOverview overview={course.overview} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Index;
