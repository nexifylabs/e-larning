import Subscription from "database/models/subscription";
import Subscription_Perk from "@/database/models/subscription_perk";


export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            await handlePost(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
}
async function handlePost(req, res) {
    try {
        const subs = await Subscription.findAll();


        for (const sub of subs) {
            for (const perk of sub.perks) {

                await Subscription_Perk.create({
                    subscriptionId: sub.id,
                    text: perk.text,
                    value: perk.value
                })
            }
        }

        res.status(201).json(subs
        );
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            error_code: "get_my_subs",
            message: e.message,
        });
    }
}
