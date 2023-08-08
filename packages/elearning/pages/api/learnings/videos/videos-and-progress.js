import {Video, Course, Course_Progress} from "@/database/models";

export default async function handler(req, res) {
    const {courseId, userId, videoId} = req.query;
    console.log(req.query);
    try {
        const progress = await Course_Progress.findOne({
            where: {
                userId: userId, courseId: courseId, videoId: videoId
            }
        });

        res.status(200).json({
            progress: progress.finished
        });
    } catch (e) {
        res.status(200).json({
            progress: false
        });
    }
}
