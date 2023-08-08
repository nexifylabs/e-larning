import {Course_Progress, Video} from "@/database/models";

export default async function handler(req, res) {
	const { courseId, userId } = req.query;

	console.log(courseId, userId)

	try {
		const courseProgress = await Course_Progress.findAll({
			where: { userId: userId, courseId: courseId },
		});
		const courseVideos = await Video.findAll({
			where: { courseId: courseId },
		});

		// console.log(courseVideos)

		res.status(200).json({
			courseProgress,
			totalVideos: courseVideos.length
		});
	} catch (e) {
		res.status(400).json({
			error_code: "progress",
			message: e.message,
		});
	}
}
