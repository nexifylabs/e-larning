import React, { useEffect, useState } from 'react';
import baseUrl from "@/utils/baseUrl";
import axios from "axios";

const Player = ({ videoSrc, videoId, onPlay, courseId }) => {
    const [src, setSrc] = useState(videoSrc);

    useEffect(() => {
        setSrc(videoSrc);
    }, [videoSrc]);

    async function handleEnded(){
        const url = `${baseUrl}/api/learnings/video/find-one-by-course-and-short-id?short_id=${videoId + 1}&courseId=${courseId}`;
        const response = await axios.get(url);
        // console.log(response.data)
        onPlay(response.data.video.id)
    }

    return (
        <div className='video-content-box'>
            <video
                key={src}
                width='100%'
                height='100%'
                controls
                controlsList='nodownload'
                preload='auto'
                onEnded={handleEnded}
            >
                <source src={src && src} type='video/mp4' />
            </video>
        </div>
    );
};

export default Player;
