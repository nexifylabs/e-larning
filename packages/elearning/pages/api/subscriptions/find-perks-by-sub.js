import Subscription from "database/models/subscription";
import Subscription_Perk from "@/database/models/subscription_perk";


export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            await handleGet(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
}
async function handleGet(req, res) {

    const {subscriptionId} = req.query

    console.log(subscriptionId)

    try {
        const subs = await Subscription_Perk.findAll({
            where: {
                subscriptionId: subscriptionId
            }
        });

        console.log(subs)

        return res.status(200).json(subs);
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            error_code: "get_my_subs",
            message: e.message,
        });
    }
}
