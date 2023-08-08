import {Purchase} from "@/database/models";
import {Op} from "sequelize";

export default async (req, res) => {

    if (!("authorization" in req.headers)) {
        return res.status(401).json({message: "No autorization token"});
    }

    switch (req.method) {
        case "GET":
            await getAllPurchases(req, res);
            break;
        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
};

// const getAllPurchases = async (req, res) => {
//     try {
//
//         const purchase = await Purchase.findAll();
//
//         if (!purchase) {
//             return res.status(404).json({message: 'Purchases not found'});
//         }
//
//         return res.status(200).json(purchase);
//
//     } catch (e) {
//         res.status(400).json({
//             error_code: "get_purchase_by_id",
//             message: e.message,
//         });
//     }
// };

const getAllPurchases = async (req, res) => {
    try {
        console.log(req.query, 'a;sjdflak')
        const {page, search = req.query.search ? req.query.search : " ", pageSize} = req.query;

        const offset = (page - 1) * pageSize;

        const {count, rows: purchases} = await Purchase.findAndCountAll({
            offset,
            limit: Number(pageSize),
            order: [['updated_at', 'DESC']],
            where: {
                paymentState: 'SUCCESS',
                [Op.or]: [
                    {buyerName: {[Op.like]: `%${search}%`}},
                    {buyerEmail: {[Op.like]: `%${search}%`}},
                    {buyerPhoneNumber: {[Op.like]: `%${search}%`}},
                ],
            },
        });


        if (purchases.length === 0) {
            return res.status(404).json({message: 'Purchases not found'});
        }

        return res.status(200).json({
            page,
            pageSize,
            totalPages: Math.ceil(count / pageSize),
            totalCount: count,
            purchases,
        });
    } catch (e) {
        res.status(400).json({
            error_code: 'get_purchase_by_id',
            message: e.message,
        });
    }
};
