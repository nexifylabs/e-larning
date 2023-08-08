
import User from "database/models/user"


export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
}

const handleGetRequest = async (req, res) => {
    const {email} =
        req.query

    try {

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        console.log(user)

        if (!user){
            return res.status(200).json({
                message: "ok",
                exists: false
            });
        }

        return res.status(200).json({
            message: "Email already exists",
            exists: true,
            userEmail: user.email
        });
    } catch (e) {
        res.status(400).json({
            error_code: "email_already_exists",
            message: e.message,
        });
    }
};
