import Banner from "database/models/banner";

export default async function handler(req, res) {
    if (!("authorization" in req.headers)) {
        return res.status(401).json({ message: "No autorization token" });
    }
    switch (req.method) {
        case "GET":
            await handleGet(req, res);
            break;
        case "DELETE":
            await handleDelete(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
}

const handleGet = async (req, res) => {
    try {
        const banners = await Banner.findAll({
            order: [["created_at", "DESC"]],
            limit: 20,
        });

        res.status(200).json({ banners });
    } catch (e) {
        res.status(400).json({
            error_code: "get_banners",
            message: e.message,
        });
    }
};

const handleDelete = async (req, res) => {
    const { bannerId } = req.query;
    try {
        const banner = await Banner.findOne({
            where: { id: bannerId },
        });

        banner.destroy();

        res.status(200).json({ message: "Banner deleted successfully." });
    } catch (e) {
        res.status(400).json({
            error_code: "get_Banner",
            message: e.message,
        });
    }
};