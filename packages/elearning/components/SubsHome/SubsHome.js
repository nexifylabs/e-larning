import React from 'react';
import Styles from '@/components/SubsHome/SubsHome.module.css';
import { useMediaQuery } from 'react-responsive';
const SubsHome = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    return (
        <div className='subscription-card'>
            <a href='/learning/sub-form' style={{ cursor: 'pointer' }}>
                <img
                    className={Styles.img}
                    src={
                        isMobile
                            ? '/images/Home_Plataforma.png'
                            : '/images/Home_Plataforma.png'
                    }
                    style={{
                        borderRadius: '40px',
                        position: 'relative',
                        left: '30px',
                        top: '20px',
                    }}
                />
            </a>
        </div>
    );
};
//
export default SubsHome;
