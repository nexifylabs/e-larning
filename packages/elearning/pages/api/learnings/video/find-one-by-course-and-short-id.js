import {Video, Course_Progress} from "@/database/models";

export default async function handler(req, res) {
    const {short_id, courseId} = req.query;

    try {
        const video = await Video.findOne({
            where: {
                courseId: courseId,
                short_id: short_id
            }
        });

        if (!video) {

            const video1 = await Video.findOne({
                where: {
                    courseId: courseId,
                    short_id: 1
                }
            })

            res.status(200).json({
                video: video1
            });
        }

        res.status(200).json({
            video,
        });
    } catch (e) {
        res.status(400).json({
            error_code: "get_videos", message: e.message,
        });
    }
}