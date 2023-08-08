import React, { useEffect, useState } from 'react';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import StickyBox from 'react-sticky-box';
import Player from '@/components/Learning/Player';
import { useRouter } from 'next/router';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';
import VideoList from '@/components/Learning/VideoList';
import ProgressManager from '@/components/Learning/ProgressManager';
import CourseOverview from '@/components/Learning/CourseOverview';
import Link from 'next/link';
import CourseAsset from '@/components/Learning/CourseAsset';
import CourseDiscussion from '@/components/Learning/CourseDiscussion';
import CourseRating from '@/components/Learning/CourseRating';
import CourseFeedback from '@/components/Learning/CourseFeedback';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import { redirectUser } from '@/utils/auth';
import App from 'next/app';
import { progress } from '@/utils/helper';
import Modal from 'react-modal';

const Index = ({ user }) => {
    const [videos, setVideos] = useState([]);
    const [modules, setModules] = useState([]);
    const [course, setCourse] = useState({});
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedVideoName, setSelectedVideoName] = useState('');
    const [selectedVideoId, setSelectedVideoId] = useState('');
    const [active, setActive] = useState('');
    const [tab, setTab] = useState('overview');
    const {
        query: { slug },
    } = useRouter();
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [dropdownOpen, setDropdownOpen] = useState(
        Array(modules.length).fill(false)
    );

    const toggleDropdown = (index) => {
        setDropdownOpen((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const fetchVideos = async () => {
        // const url = `${baseUrl}/api/learnings/videos/videos-and-progress?slug=${slug}&userId=${user.id}`;
        const url = `${baseUrl}/api/learnings/videos/${slug}`;
        const response = await axios.get(url);

        setVideos(response.data.videos);
        setSelectedVideo(response.data.videos[0].video);
        setSelectedVideoName(response.data.videos[0].title);

        setSelectedVideoId(response.data.videos[0].short_id);
        setActive(response.data.videos[0].id);
        setCourse(response.data.course);

        if (response.data.course.orderNumber > 1) {
            const url1 = `${baseUrl}/api/courses/course/find-one?orderNumber=${
                response.data.course.orderNumber - 1
            }`;
            const response1 = await axios.get(url1);
            const previousCourse = response1.data.course;
            // console.log(previousCourse)

            const url2 = `${baseUrl}/api/learnings/progress?courseId=${previousCourse.id}&userId=${user.id}`;
            const response2 = await axios.get(url2);
            const previousCourseData = response2.data;
            const previousCourseProgress = progress(
                previousCourseData.courseProgress.length,
                previousCourseData.totalVideos
            );
            if (previousCourseProgress < 100 && user.isSub) {
                alert('No has terminado el curso anterior');
                router.push('/learning/my-courses/');
            }
            // console.log(response2.data)
        }

        // console.log(user, response.data.course)
    };

    async function fetchProgresses(groupNames, isVideoClicked) {
        let i = 1;

        const modulesVideos = [];

        for (const mod of groupNames) {
            const url = `${baseUrl}/api/learnings/module-progress?courseId=${course.id}&userId=${user.id}&group_name=${mod}`;
            const response = await axios.get(url);

            if (
                progress(
                    response.data.courseProgress.length,
                    response.data.totalVideos
                ) === 100
            ) {
                // console.log("terminado")
                modulesVideos.push({
                    group_name: mod,
                    videos: videos.filter((e) => e.group_name === mod),
                    active: i === 1,
                    index: i++,
                    finished: true,
                });
                if (isVideoClicked) {
                    ///TODO: @peluke aca dentro de este if podes usar la propiedad isVideoClicked para avisarle
                    ///TODO: al usuario que termino un modulo y que desbloqueo el siguiente
                    ///TODO: el nombre del modulo que termino esta en la prop que se llama 'mod'

                    openModal();
                }
            } else {
                modulesVideos.push({
                    group_name: mod,
                    videos: videos.filter((e) => e.group_name === mod),
                    active: i === 1,
                    index: i++,
                    finished: false,
                });
            }
        }

        setModules(modulesVideos);
    }

    useEffect(() => {
        const groups = videos.map((e) => e.group_name);
        const hashset = new Set(groups);

        fetchProgresses([...hashset], false);
        // console.log(modulesVideos)
    }, [videos]);

    useEffect(() => {
        if (!user) router.push('/');
        fetchVideos();
    }, [slug]);

    const selectVideo = async (videoId) => {
        // console.log(videoId);
        try {
            const payload = {
                params: { userId: user.id, courseId: course.id },
            };
            const url = `${baseUrl}/api/learnings/video/${videoId}`;
            const response = await axios.get(url, payload);
            const {
                data: { video },
            } = response;

            setSelectedVideo(video.video);
            setSelectedVideoId(video.short_id);
            setSelectedVideoName(video.title);
            setActive(video.id);

            // console.log(video);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                contentLabel='Module Unlocked Modal'
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid #EE3A80',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px',
                        width: '80%',
                        maxWidth: '500px',
                        zIndex: '99999999999999',
                    },
                }}
            >
                <img
                    src='/sorvete-logo.png'
                    alt='Escola Sorvete Logo'
                    style={{
                        display: 'block',
                        width: '70%',
                        height: 'auto',
                        margin: '0 auto',
                    }}
                />
                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        margin: '20px 0',
                    }}
                >
                    Congratulations!
                </h2>
                <p style={{ textAlign: 'center', fontSize: '18px' }}>
                    You have unlocked a new module.
                </p>
                <button
                    onClick={closeModal}
                    style={{
                        display: 'block',
                        width: '100px',
                        margin: '20px auto',
                        padding: '10px',
                        border: 'none',
                        backgroundColor: '#EE3A80',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '500',
                        letterSpacing: '1px',
                    }}
                >
                    Continue
                </button>
            </Modal>

            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            <div className='mt-5 pb-5 video-area'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-9 col-md-8'>
                            <div className='video-content'>
                                <span
                                    style={{
                                        display: 'block',
                                        color: '#CE4883',
                                        fontSize: '24px',
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        marginBottom: '25px',
                                        textTransform: 'capitalize',
                                        textDecoration: 'underline',
                                        fontFamily: '"Arial", sans-serif',
                                    }}
                                >
                                    {selectedVideoName && selectedVideoName}
                                </span>

                                {selectedVideo && (
                                    <Player
                                        videoSrc={selectedVideo}
                                        videoId={selectedVideoId}
                                        courseId={course.id}
                                        onPlay={selectVideo}
                                    />
                                )}

                                <br />
                                <ul className='nav-style1'>
                                    <li>
                                        <Link href={`/learning/course/${slug}`}>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setTab('overview');
                                                }}
                                                className={
                                                    tab == 'overview'
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                Overview
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/learning/course/${slug}`}>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setTab('asset');
                                                }}
                                                className={
                                                    tab == 'asset'
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                Assets
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/learning/course/${slug}`}>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setTab('discussion');
                                                }}
                                                className={
                                                    tab == 'discussion'
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                Discussion
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/learning/course/${slug}`}>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setTab('rating');
                                                }}
                                                className={
                                                    tab == 'rating'
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                Leave a rating
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/learning/course/${slug}`}>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setTab('feedback');
                                                }}
                                                className={
                                                    tab == 'feedback'
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                Leave a feedback
                                            </a>
                                        </Link>
                                    </li>
                                </ul>

                                {course && tab == 'asset' ? (
                                    <CourseAsset {...course} />
                                ) : tab == 'discussion' ? (
                                    <CourseDiscussion {...course} />
                                ) : tab == 'rating' ? (
                                    <CourseRating {...course} />
                                ) : tab == 'feedback' ? (
                                    <CourseFeedback {...course} />
                                ) : (
                                    <CourseOverview {...course} />
                                )}
                            </div>
                        </div>

                        {/*  */}

                        <div className='col-lg-3 col-md-4'>
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <div className='video-sidebar'>
                                    <div
                                        className='course-video-list'
                                        style={{ marginTop: '28px' }}
                                    >
                                        <h4 className='nombre-del-curso'>
                                            {course && course.title}
                                        </h4>
                                        {videos.length > 0 &&
                                            modules.length > 0 &&
                                            modules.map((e, index) => (
                                                <div
                                                    key={index}
                                                    className='module'
                                                >
                                                    <button
                                                        className={`module-header ${
                                                            dropdownOpen[index]
                                                                ? 'open'
                                                                : ''
                                                        }`}
                                                        onClick={() =>
                                                            toggleDropdown(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        {e && e.group_name}
                                                        {e.finished && (
                                                            <div>✔️</div>
                                                        )}
                                                    </button>
                                                    {dropdownOpen[index] && (
                                                        <ul className='module-videos'>
                                                            {e.videos.map(
                                                                (video) => (
                                                                    <VideoList
                                                                        onClick={
                                                                            fetchProgresses
                                                                        }
                                                                        groupNames={modules.map(
                                                                            (
                                                                                e
                                                                            ) =>
                                                                                e.group_name
                                                                        )}
                                                                        key={
                                                                            video.id
                                                                        }
                                                                        {...video}
                                                                        onPlay={() =>
                                                                            selectVideo(
                                                                                video.id
                                                                            )
                                                                        }
                                                                        activeClass={
                                                                            active
                                                                        }
                                                                        user={
                                                                            user
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                    <hr className='payment-field-border' />
                                    <div style={{ marginTop: '45px' }}>
                                        <ProgressManager
                                            videos_count={videos.length}
                                            userId={user && user.id}
                                            courseId={course.id}
                                            selectedVideo={selectedVideo}
                                        />
                                    </div>
                                </div>
                            </StickyBox>
                        </div>

                        {/*  */}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Index;
