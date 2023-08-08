import React from 'react';
import StickyBox from 'react-sticky-box';
import DisabledVideoList from './DisabledVideoList';

const DisabledModule = ({ course, videos = [], modules = [] }) => {
    return (
        <div className='col-lg-3 col-md-4'>
            <StickyBox offsetTop={20} offsetBottom={20}>
                <div className='video-sidebar disabled'>
                    <h4 className='nombre-del-curso'>
                        {course && course.title}
                    </h4>
                    {videos.length > 0 &&
                        modules.length > 0 &&
                        modules.map((e, index) => (
                            <div key={index} className='module'>
                                <button className='module-header' disabled>
                                    {e && e.group_name}
                                </button>
                                <ul className='module-videos'>
                                    {e.videos.map((video) => (
                                        <DisabledVideoList
                                            key={video.id}
                                            {...video}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>
            </StickyBox>
        </div>
    );
};

export default DisabledModule;
