import jwt from "jsonwebtoken";
import Notification from "@/database/models/notification";
import User from "@/database/models/user";



export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
};

const handleGetRequest = async (req, res) => {


    try {

        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        const user = await User.findOne({
            where: {id: userId}
        })

        if (!user) throw new Error("User does not found.")


        console.log(user)

        const notifications = await Notification.findAll({
                where: {userId: userId},
            }
        )


        res.status(200).json({
            message: "Password Updated.",
            payload: notifications
        });

    } catch (e) {
        res.status(400).json({
            error_code: "password_change", message: e.message,
        });
    }
};
