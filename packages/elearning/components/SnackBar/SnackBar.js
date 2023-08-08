import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './SnackBar.module.css';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';

const SnackBar = ({ current_user, course }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [add, setAdd] = useState(false);
    const discount = useSelector((state) => state.cart.discount);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRecommendedCourses = async () => {
            const response = await axios.get(
                `${baseUrl}/api/get-courses-recommend`
            );
            console.log(response);
            const data = response.data;
            setCourses(data.courses);
        };
        fetchRecommendedCourses();
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    const addToCart = (courseCart) => {
        let courseObj = {};
        courseObj['id'] = courseCart.id;
        courseObj['title'] = courseCart.title;
        courseObj['slug'] = courseCart.slug;
        courseObj['price'] = discount > 0 ? discount : courseCart.latest_price;
        courseObj['regular_price'] = courseCart.before_price;
        courseObj['image'] = courseCart.image;
        courseObj['lessons'] = courseCart.lessons;
        courseObj['duration'] = courseCart.duration;
        courseObj['access_time'] = courseCart.access_time;
        courseObj['quantity'] = 1;
        courseObj['hotmartId'] = courseCart.hotmartId;

        // courseObj[
        //     'instructor'
        // ] = `${courseCart.user.first_name} ${courseCart.user.last_name}`;
        dispatch({
            type: 'ADD_TO_CART',
            data: courseObj,
        });
    };

    return (
        <div
            className={`${styles.snackbarContainer} ${
                isOpen ? styles.snackbarContainerOpen : ''
            }`}
            onClick={handleToggle}
        >
            {isOpen ? (
                <div
                    className={styles.snackbarContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className={styles.header}>
                        Recommended Courses
                        <AiOutlineClose
                            onClick={handleClose}
                            style={{ marginLeft: 'auto', cursor: 'pointer' }}
                        />
                    </h3>
                    <div className={styles.courseList}>
                        {courses.map((course) => (
                            <div key={course.id} className={styles.courseItem}>
                                <img
                                    src={course.image}
                                    style={{ width: '50px' }}
                                />
                                <div className={styles.courseInfo}>
                                    <h4 className={styles.subtitleRecommends}>
                                        {course.title}
                                    </h4>
                                </div>
                                <button
                                    onClick={() => addToCart(course)}
                                    className={styles.buttonRecommends}
                                    disabled={add}
                                >
                                    {' '}
                                    <i className='flaticon-shopping-cart'></i>{' '}
                                    <span></span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.snackbarCollapsed}>
                    Recommended Courses
                </div>
            )}
        </div>
    );
};

export default SnackBar;
