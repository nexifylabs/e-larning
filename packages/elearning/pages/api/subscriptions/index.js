import Subscription from "@/database/models/subscription";
import Subscription_Perk from "@/database/models/subscription_perk";
import Sequelize from "sequelize";
import connection from "@/database/connection";


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

    try {
        const subs = await Subscription.findAll();
        const perks = await Subscription_Perk.findAll({
            // order: [["text", "ASC"], ["value"]]
            order: [["value", "DESC"],["text", "ASC"]]
            // order: [["text", "ASC"],["value", "DESC"],]
        });


        res.status(200).json({subs, perks});
    } catch (e) {
        console.log(e)
        res.status(400).json({
            error_code: "get_my_subs",
            message: e.message,
        });
    }
}
