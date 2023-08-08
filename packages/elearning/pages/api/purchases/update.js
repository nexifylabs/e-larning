import {Course, Enrolment, Purchase, User} from "@/database/models";
import {checkoutConfirmation} from "../../../email-templates/checkout-confirmation";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";

import {confirmEmailAddress} from "../../../email-templates/account-confirmation";
import passwordGenerator from "password-generator";
import {passwordResetConfirmation} from "../../../email-templates/password-reset-confirmation";
import jwt from "jsonwebtoken";
import {passwordNewUserUnloggedAfterPurchase} from "../../../email-templates/password-new-user-unlogged-after-purchase";

export default async (req, res) => {

    // if (!("authorization" in req.headers)) {
    //     return res.status(401).json({message: "No autorization token"});
    // }

    switch (req.method) {
        case "GET":
            await purchase(req, res);
            break;

        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
};


async function persistCourses(purchase, user) {

    for (const cart of purchase.items) {

        if (cart.type === 'sub') {

            await User.update({
                isSub: true
            }, {where: {id: user.id}})

            const courses = await Course.findAll()

            for (const course of courses) {
                await Enrolment.create({
                    bought_price: course.latest_price,
                    payment_method: "Getnet",
                    buyer_name: purchase.buyerName,
                    buyer_email: user.email,
                    buyer_avatar: user.profile_photo,
                    userId: user.id,
                    courseId: course.id,
                    status: "paid",
                })
            }
            continue
        }

        const enrol = await Enrolment.findOne({
            where: {userId: purchase.userId, courseId: cart.id}
        })

        if (enrol) throw new Error("Enrolment already exists")

        await Enrolment.create({

            bought_price: cart.amount,
            payment_method: "Getnet",
            buyer_name: purchase.buyerName,
            buyer_email: user.email,
            buyer_avatar: user.profile_photo,
            userId: user.id,
            courseId: cart.id,
            status: "paid",

        });
    }

}


const purchase = async (req, res) => {

    console.log("mamma")

    const purchaseId = req.query.orderId;
    const paymentStatus = "SUCCESS"

    try {


        const purchase = await Purchase.findOne({where: {id: purchaseId}});
        if (!purchase) {
            return res.status(404).json({
                error_code: "purchase_not_found", message: "Purchase not found.",
            });
        }

        // console.log(req.body)
        // return console.log(req.body.data.paymentStatus)

        await Purchase.update({paymentState: paymentStatus}, {
            where: {id: purchaseId}
        });

        let user = await User.findOne({
            where: {id: purchase.userId}
        })

        if (!user) {

            const confirmToken = uuidv4()

            const passwordRandom = passwordGenerator(12, false)

            await passwordNewUserUnloggedAfterPurchase(passwordRandom, purchase.buyerName, purchase.buyerEmail)

            const passwordHash = await bcrypt.hash(passwordRandom, 10);

            user = await User.create({
                first_name: purchase.buyerName,
                last_name: purchase.buyerName,
                email: purchase.buyerEmail,
                password: passwordHash,
                reset_password_token: confirmToken,
                reset_password_send_at: Date.now(),
                email_confirmed: true,
                email_confirmed_at: Date.now(),
            });

            jwt.sign({
                userId: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                profile_photo: user.profile_photo,
            }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });

            await persistCourses(purchase, user)
            await checkoutConfirmation(purchase.items, purchase.buyerName, purchase.buyerEmail);

            return res.redirect(301, '/payment-successful')


        }


        await persistCourses(purchase, user)

        // for (const cart of purchase.items) {
        //
        //     if (cart.type === 'sub'){
        //
        //         const courses = await Course.findAll()
        //
        //         for (const course of courses){
        //             await Enrolment.create({
        //                 bought_price: course.latest_price,
        //                 payment_method: "Getnet",
        //                 buyer_name: purchase.buyerName,
        //                 buyer_email: user.email,
        //                 buyer_avatar: user.profile_photo,
        //                 userId: user.id,
        //                 courseId: course.id,
        //                 status: "paid",
        //             })
        //         }
        //         continue
        //     }
        //
        //     const enrol = await Enrolment.findOne({
        //         where: {userId: purchase.userId, courseId: cart.id}
        //     })
        //
        //     if (enrol) throw new Error("Enrolment already exists")
        //
        //     await Enrolment.create({
        //
        //         bought_price: cart.price,
        //         payment_method: "Getnet",
        //         buyer_name: purchase.buyerName,
        //         buyer_email: user.email,
        //         buyer_avatar: user.profile_photo,
        //         userId: user.id,
        //         courseId: cart.id,
        //         status: "paid",
        //
        //     });
        // }

        // console.log(purchase.items, purchase.buyerName, purchase.buyerEmail)

        await checkoutConfirmation(purchase.items, purchase.buyerName, purchase.buyerEmail);


        return res.redirect(301, "/payment-successful",)


        // res.status(201).json({
        //     message: "ok",
        //     purchase: purchase
        // })


    } catch (e) {
        res.status(400).json({
            error_code: "purchase_update", message: e.message,
        });
    }
};
