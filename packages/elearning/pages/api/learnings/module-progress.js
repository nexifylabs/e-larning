import {Course_Progress, Video} from "@/database/models";
import Sequelize from "sequelize";
import * as sequelize from "sequelize";

export default async function handler(req, res) {
    const { courseId, userId, group_name } = req.query;

    // console.log(group_name)

    try {
        const courseProgress = await Course_Progress.findAll({
            where: {
                userId: userId,
                courseId: courseId,
                },
            include: [
                {
                    model: Video,
                    as: 'video',
                    where: {group_name: group_name}
                }
            ]

        });

        const courseVideos = await Video.findAll({
            where: {
                courseId: courseId,
                group_name: group_name },
        });

        // console.log(courseVideos, courseVideos)

        res.status(200).json({
            courseProgress: courseProgress,
            totalVideos: courseVideos.length
        });
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            error_code: "progress",
            message: e.message,
        });
    }
}
