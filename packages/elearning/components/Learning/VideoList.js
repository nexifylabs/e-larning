import React, {useEffect, useState} from 'react';
import {secondsToHms} from '@/utils/helper';
import baseUrl from "@/utils/baseUrl";
import axios from "axios";

const VideoList = ({
                       id,
                       title,
                       short_id,
                       video_length,
                       onPlay,
                       activeClass,
                       onClick,
                       groupNames,
                       courseId,
                       user
                   }) => {

    const [finished, setFinished] = useState(false)

    async function fetchProgress(){
        const url = `${baseUrl}/api/learnings/videos/videos-and-progress?courseId=${courseId}&userId=${user.id}&videoId=${id}`;
        const response = await axios.get(url);
        setFinished(response.data.progress)
    }

    useEffect(() => {

        if (short_id === 1) {
            onPlay(short_id)
            onClick(groupNames, false)
        }

        fetchProgress()


    }, [finished])

    return (
        <li className={activeClass === id ? 'active' : ''}

            onBlur={() => {
                onPlay(id)
                onClick(groupNames, false)
                fetchProgress()
            }}
            onClick={() => {
                onPlay(id)
                onClick(groupNames, false)
                fetchProgress()
            }}
        >

            {finished && <div>✔️</div>}

            {short_id}.{title}
            <span className='d-block text-muted fs-13 mt-1 cursor-pointer-one'>
                <i className='bx bx-play-circle'></i>{' '}
                {secondsToHms(video_length)}
            </span>
        </li>
    );
};

export default VideoList;