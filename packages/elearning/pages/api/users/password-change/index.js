import axios from "axios";
import jwt from "jsonwebtoken";
import User from "@/database/models/user";
import bcrypt from "bcrypt";
import {passwordResetConfirmation} from "../../../../email-templates/password-reset-confirmation";
import {v4 as uuidv4} from "uuid";


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

        const {oldPw, password1, password2} = req.body

        const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        const user = await User.findOne({
            where: {id: userId},
        });

        if (!user) throw new Error(" User does not found.")


        const resultA = bcrypt.compareSync(oldPw, user.password)
        if (!resultA) throw new Error("Incorrect current password.")


        if (password1 !== password2) throw new Error("Passwords dont match.")
        if (password1.length < 6) throw new Error("Password should be minimum of six characters long")

        const resultB = bcrypt.compareSync(password1, user.password)
        if (resultB) throw new Error("The new password cannot be the same as the old password");


        const passwordHash = await bcrypt.hash(password1, 10);

        await User.update({
            password: passwordHash
        },
            {where: {id: userId}}
        )


        res.status(200).json({
            message: "Password Updated.",
        });

    } catch (e) {
        res.status(400).json({
            error_code: "password_change", message: e.message,
        });
    }
};
