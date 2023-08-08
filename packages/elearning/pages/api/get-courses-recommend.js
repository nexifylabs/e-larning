import { Course } from 'database/models';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await handleGetRequest(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
}

const handleGetRequest = async (req, res) => {
    try {
        const courses = await Course.findAll();

        return res.status(200).json({
            courses,
        });
    } catch (e) {
        res.status(400).json({
            error_code: 'get_all_courses_recommend',
            message: e.message,
        });
    }
};
