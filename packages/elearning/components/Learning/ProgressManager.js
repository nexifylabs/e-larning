import React, { useEffect, useState } from 'react';
import { progress } from '@/utils/helper';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProgressManager = ({ userId, courseId, videos_count, selectedVideo }) => {
    const [pro, setPro] = useState(0);
    const router = useRouter();
    const {
        query: { slug },
    } = useRouter();

    useEffect(() => {
        if (courseId) {
            const fetchProgrss = async () => {
                const payload = {
                    params: { userId: userId, courseId: courseId },
                };
                const url = `${baseUrl}/api/learnings/progress`;
                const response = await axios.get(url, payload);
                setPro(response.data.courseProgress.length);
            };

            fetchProgrss();
        }
    }, [courseId, selectedVideo]);

    return (
        <div className='mb-3'>
            <p className='mb-2'>
                Your progress{' '}
                <strong>
                    {pro} of {videos_count} complete
                </strong>
                .
            </p>
            <div className='progress-container'>
                <div
                    className='progress-bar'
                    role='progressbar'
                    aria-label='Example with label'
                    style={{ width: `${progress(pro, videos_count)}%` }}
                    aria-valuenow={`${progress(pro, videos_count)}`}
                    aria-valuemin='0'
                    aria-valuemax='100'
                >
                    {progress(pro, videos_count)}%
                </div>
            </div>

            {progress(pro, videos_count) == 100 ? (
                <button
                    className='button-style-progress bg-roze'
                    onClick={() => router.push(`/learning/certificate/${slug}`)}
                >
                    Get certificate
                </button>
            ) : (
                <button className='button-style-progress' disabled>
                    Get certificate
                </button>
            )}
        </div>
    );
};

export default ProgressManager;
