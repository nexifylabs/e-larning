import jwt from "jsonwebtoken";
import Banner from "database/models/banner";

export default async (req, res) => {
    if (!("authorization" in req.headers)) {
        return res.status(401).json({ message: "No autorization token" });
    }
    switch (req.method) {
        case "PUT":
            await handlePut(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
};

const handlePut = async (req, res) => {
    const {
        bannerId
    } = req.body;
    try {
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        const banners = await Banner.findAll();
        await Banner.update({ isNavBar: false }, {
            where: {
                id: banners.map(banner => banner.id)
            }
        });

        const ban = await Banner.update(
            {
                isNavBar: true
            },
            {
                where: { id: bannerId },
            }
        );

        res.status(200).json({
            message: "Profile updated.",
            isHome: ban.isNavBar
        });
    } catch (e) {
        res.status(400).json({
            error_code: "update_user",
            message: e.message,
        });
    }
};
