import {Purchase} from "@/database/models";

export default async (req, res) => {

    if (!("authorization" in req.headers)) {
        return res.status(401).json({message: "No autorization token"});
    }

    switch (req.method) {
        case "GET":
            await getPurchaseById(req, res);
            break;
        case "PUT":
            await purchaseUpdate(req, res);
            break;
        case "POST":
            await purchaseCreate(req, res);
            break;

        default:
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
    }
};

const getPurchaseById = async (req, res) => {
    try {
        const {purchaseId} = req.query

        const purchase = await Purchase.findByPk(purchaseId);

        if (!purchase) {
            return res.status(404).json({message: 'Purchase not found'});
        }

        const {id, paymentState} = purchase;
        res.status(200).json({id, paymentState});

    } catch (e) {
        res.status(400).json({
            error_code: "get_purchase_by_id",
            message: e.message,
        });
    }
};

const purchaseUpdate = async (req, res) => {
    const purchaseId = req.body.data.purchaseId;
    // const paymentState = req.body.data.paymentStatus;



    try {



        const purchase = await Purchase.findOne({where: {id: purchaseId}});
        if (!purchase) {
            return res.status(404).json({
                error_code: "purchase_not_found",
                message: "Purchase not found.",
            });
        }


        // console.log(req.body)
        // return console.log(req.body.data.paymentStatus)

        const updatedPurchase = await Purchase.update({paymentState: req.body.data.paymentStatus},
            {
                where: {id: purchaseId}
            }
            );


        const {id, paymentState, items} = purchase;

        res.status(200).json({
            message: "Purchase updated.",
            data: {id, paymentState, items}
        });
    } catch (e) {
        res.status(400).json({
            error_code: "purchase_update",
            message: e.message,
        });
    }
};

const purchaseCreate = async (req, res) => {


    const purchase = req.body;

    // Validate input data
    const {error} = validatePurchase(purchase);
    if (error) {
        // console.log(error)

        return res.status(400).json({
            error_code: "purchase_validation_error",
            message: error.details[0].message,
        });
    }

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


const validatePurchase = (purchase) => {
    const Joi = require("joi");
    const schema = Joi.object({
        id: Joi.string().required(),
        userId: Joi.string().required(),
        amount: Joi.number().positive().required(),
        buyerEmail: Joi.string().email().required(),
        buyerName: Joi.string().required(),
        buyerDocType: Joi.string().required(),
        buyerDocNumber: Joi.string().required(),
        buyerAdressStreetNumber: Joi.string().required(),
        buyerPhoneNumber: Joi.string().allow(null, ''),
        buyerAdressStreet: Joi.string().required(),
        buyerAdressComplementary: Joi.string().allow(null, ''),
        buyerAdressNeighborhood: Joi.string().required(),
        buyerAdressCity: Joi.string().required(),
        buyerAdressState: Joi.string().required(),
        buyerAdressZipCode: Joi.string().required(),
        buyerCountry: Joi.string().required(),
        items: Joi.array().required(),
        paymentState: Joi.string().valid('SUCCESS', 'FAILED', 'PENDANT').required(),
        paymentType: Joi.string().valid('get-net credito/debito', 'Manually added').required(),
    });
    return schema.validate(purchase);
};