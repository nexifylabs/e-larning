import {v4 as uuidv4} from "uuid";
import {Enrolment, Instructor_Earning, Course} from "database/models";
import {calculateCartTotal} from "@/utils/calculateCartTotal";
import {checkoutConfirmation} from "../../../email-templates/checkout-confirmation";


export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            await handlePostRequest(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
}

const handlePostRequest = async (req, res) => {
    const {cartItems, userId, buyer_name, buyer_email, buyer_avatar} = req.body;

    // console.log(req.body)

    const {stripeTotal} = calculateCartTotal(cartItems);

    // console.log(stripeTotal)

    try {

        for (const cart of cartItems) {

            const enrol = await Enrolment.findOne({
                where: {userId: userId, courseId: cart.id}
            })

            if (enrol) throw new Error("Enrolment already exists")

            await Enrolment.create({
                bought_price: cart.price,
                payment_method: "Getnet",
                buyer_name: buyer_name,
                buyer_email: buyer_email,
                buyer_avatar: buyer_avatar,
                userId: userId,
                courseId: cart.id,
                status: "paid",
            });
        }

        await checkoutConfirmation(cartItems, buyer_name, buyer_email);

        res.status(200).json({
            message: "Enroled successfully.",
        });
    } catch (e) {
        res.status(400).json({
            error_code: "create_enroled", message: e.message,
        });
    }
};
