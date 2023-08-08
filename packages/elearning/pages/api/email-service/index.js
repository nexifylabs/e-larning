
import hotmartContacts from './contactosHotmart.json'
import passwordGenerator from 'password-generator'
import HotmartUser from "database/models/hotmartUser"


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
    const {} =
        req.body;

    try {

        const passwordContacts = hotmartContacts.map((elem => {

            const password = passwordGenerator(12, false)

            const newUser = {
                name: elem.Nombre,
                email: elem.Email,
                password: password
            }

            return newUser
        }))

            await HotmartUser.bulkCreate(passwordContacts)


        // console.log(user)

        res.status(200).json({
            message: "users persisted",
        });
    } catch (e) {
        res.status(400).json({
            error_code: "hotmart_users",
            message: e.message,
        });
    }
};
