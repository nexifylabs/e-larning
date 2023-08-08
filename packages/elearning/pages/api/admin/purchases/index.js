import {Purchase} from "@/database/models";

export default async (req, res) => {

    // if (!("authorization" in req.headers)) {
    //     return res.status(401).json({message: "No autorization token"});
    // }

    switch (req.method) {
        case "POST":
            await purchaseCreate(req, res);
            break;

        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
};



const purchaseCreate = async (req, res) => {


    const {purchase} = req.body;

    // console.log(purchase)

    try {
        const newPurchase = await Purchase.create(purchase);
        const {id, userId, paymentState} = newPurchase
        return res.status(201).json({
            message: 'Purchase created.',
            data: {id, userId, paymentState}
        });
    } catch (err) {

        // console.log(err)

        return res.status(400).json({
            error_code: "purchase_creation_error",
            message: err.message
        });
    }
};