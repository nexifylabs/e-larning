import axios from "axios";
import jwt from "jsonwebtoken";
import User from "@/database/models/user";
import passwordGenerator from "password-generator";
import bcrypt from "bcrypt";
import {passwordResetConfirmation} from "../../../../email-templates/password-reset-confirmation";
import { v4 as uuidv4 } from "uuid";


export default async (req, res) => {
    switch (req.method) {
        case "PUT":
            await handlePutRequest(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
};

const handlePutRequest = async (req, res) => {


    try {

        const {userEmail, token} = req.query

        // console.log(user.id)

        const user = await User.findOne({
            where: {email: userEmail},
        });

        if (!user) throw new Error("User does not found.")

        if (token !== user.reset_password_token) throw new Error("Invalid Token.")

        const passwordRandom = passwordGenerator(12, false)

        // return console.log(passwordRandom)

        const passwordHash = await bcrypt.hash(passwordRandom, 10);

        await User.update(
            {
                password: passwordHash
            },
            {
                where: {email: userEmail}
            }
        )

        await passwordResetConfirmation(passwordRandom, user.first_name, user.email)

        const confirmToken = uuidv4();

        await User.update(
            {
                reset_password_token: confirmToken
            },
            {
                where: {email: userEmail}
            }
        )

        res.status(200).json({
            message: "Password Updated.",
            newPasswordResetToken: confirmToken
        });

    } catch (e) {
        res.status(400).json({
            error_code: "create_link", message: e.message,
        });
    }
};
