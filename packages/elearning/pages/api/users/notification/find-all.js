import Notification from "@/database/models/notification";

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

        const notifications = await Notification.findAll()


        res.status(200).json({
            message: "get-all",
            payload: notifications
        });

    } catch (e) {
        res.status(400).json({
            error_code: "all-notification", message: e.message,
        });
    }
};
