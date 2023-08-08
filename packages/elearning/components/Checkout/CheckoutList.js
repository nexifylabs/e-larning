import React from 'react';
import Link from 'next/link';

const CheckoutList = ({
    id,
    image,
    title,
    instructor,
    slug,
    price,
    regular_price,
    lessons,
    duration,
    access_time,
    onRemove,
}) => {
    return (
        <>
            <div className='col-lg-3'>
                <img src={image} alt={title} />
            </div>
            <div className='col-lg-5'>
                <div className='content'>
                    <h3>
                        <p>{title}</p>
                    </h3>

                    {/* <p className='fs-14 mb-2'>{instructor}</p> */}

                    {/* <ul className='list'>
                        <li>{duration}</li>
                        <li>{lessons} lectures</li>
                        <li>{access_time}</li>
                    </ul> */}
                </div>
            </div>
            <div className='col-lg-2 col-6'>
                <div className='action-button'>
                    <button
                        onClick={() => onRemove(id)}
                        className='btn btn-danger remove'
                    >
                        <i className='bx bx-trash'></i>
                    </button>
                </div>
            </div>
            {/* <div className="col-lg-2 col-6">
				<div className="price text-end">
					<span className="fw-bolder fs-16 me-2 d-inline-block">
						${price}
					</span>
					{regular_price > 0 && (
						<span>
							<del className="fs-14 text-muted">
								${regular_price}
							</del>
						</span>
					)}
				</div>
			</div> */}
            <div className='col-lg-12'>
                <hr />
            </div>
        </>
    );
};

export default CheckoutList;
