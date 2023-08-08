import Banner from "database/models/banner";

export default async function handler(req, res) {
    if (!("authorization" in req.headers)) {
        return res.status(401).json({ message: "No autorization token" });
    }
    switch (req.method) {
        case "POST":
            await handlePostRequest(req, res);
            break;
        case "PUT":
            await handlePutRequest(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
}

const handlePostRequest = async (req, res) => {
    const { banner, discount } = req.body;

    try {
        const bannerExist = await Banner.findOne({
            where: { code: banner },
        });

        if (bannerExist) {
            return res.status(422).json({
                message: "Banner with the same code already exists",
            });
        }

        if (!banner) {
            return res.status(422).json({
                message: "Banner code must be provided",
            });
        }

        if (discount == 0) {
            return res.status(422).json({
                message: "Discount must be provided",
            });
        }

        const newbanner = await Banner.create({
            code: banner,
            discount: discount,
        });

        res.status(200).json({
            message: "New banner code added",
            banner: newbanner,
        });
    } catch (e) {
        res.status(400).json({
            error_code: "create_banner",
            message: e.message,
        });
    }
};

const handlePutRequest = async (req, res) => {
    const { bannerId } = req.body;
    console.log(bannerId);
    try {
        const banners = await Banner.findAll({ attributes: ["id"] });
        let bannerIds = [];
        banners.forEach((cp) => {
            bannerIds.push(cp.id);
        });

        Banner.update(
            { active_for_full_site: false },
            {
                where: {
                    id: bannerIds,
                },
            }
        );

        Banner.update(
            { active_for_full_site: true },
            {
                where: {
                    id: bannerId,
                },
            }
        );

        res.status(200).json({
            message: "Banner code activated for all courses",
        });
    } catch (e) {
        res.status(400).json({
            error_code: "banner_for_all_courses",
            message: e.message,
        });
    }
};