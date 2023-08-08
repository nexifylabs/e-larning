import React from 'react';

const DisabledCourseCard = ({
    course: { user, image, title, slug, is_class },
}) => {
    console.log(is_class);
    return (
        <div className='col-lg-4 col-md-6'>
            <div className='single-courses-box style-2'>
                <div className='courses-image'>
                    <div className='d-block image'>
                        <img
                            src={image}
                            alt={title}
                            style={{ filter: 'grayscale(100%)' }}
                        />
                    </div>

                    <div className='video_box'>
                        <div className='d-table'>
                            <div className='d-table-cell'>
                                {is_class ? (
                                    <i
                                        className='bx bx-play'
                                        style={{ color: 'gray' }}
                                    ></i>
                                ) : (
                                    <i
                                        className='bx bx-play'
                                        style={{ color: 'gray' }}
                                    ></i>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='courses-content'>
                    <h3>
                        <div style={{ color: '#CE4B85' }}>{title}</div>
                    </h3>

                    <div className='course-author d-flex align-items-center'>
                        <span>{`${user.first_name} ${user.last_name}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisabledCourseCard;
