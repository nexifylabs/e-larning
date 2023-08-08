import React from 'react';
import { secondsToHms } from '@/utils/helper';

const DisabledVideoList = ({ id, title, short_id, video_length }) => {
    return (
        <li className='disabled-video-module'>
            {short_id}. {title}
            <span className='d-block text-muted fs-13 mt-1'>
                <i className='bx bx-play-circle'></i>{' '}
                {secondsToHms(video_length)}
            </span>
        </li>
    );
};

export default DisabledVideoList;
