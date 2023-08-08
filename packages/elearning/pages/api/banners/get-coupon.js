import Banner from "database/models/banner";

export default async function handler(req, res) {
    const { banner } = req.body;

    try {
        if (!banner) {
            return res.status(422).json({
                message: "Invalid banner",
            });
        }

        const discount = await Banner.findOne({
            where: { code: banner, active_for_full_site: true },
        });

        if (discount) {
            res.status(200).json({ message: "Banner code applied", discount });
        } else {
            res.status(422).json({ message: "There is no any banner code" });
        }
    } catch (e) {
        res.status(400).json({
            error_code: "create_banner",
            message: e.message,
        });
    }
}