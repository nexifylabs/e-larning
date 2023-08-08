import axios from "axios";
import jwt from "jsonwebtoken";
import User from "@/database/models/user";
import passwordGenerator from "password-generator";
import bcrypt from "bcrypt";
import {passwordResetConfirmation} from "../../../../email-templates/password-reset-confirmation";
import {sendPasswordResetToken} from "../../../../email-templates/send-password-reset-token";

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

        const { userEmail } = req.query

        // console.log(user.email)

        const user = await User.findOne({
            where: {email: userEmail},
        });

        if (!user) throw new Error("User does not found.")

        await sendPasswordResetToken(user.reset_password_token, user.first_name, user.email)

        res.status(200).json({
            message: "Token Send."
        });

    } catch (e) {
        res.status(400).json({
            error_code: "token_send", message: e.message,
        });
    }
};
