import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";

import User from "database/models/user";

export default async function handler(req, res) {
	switch (req.method) {
		case "POST":
			await userSignin(req, res);
			break;
		default:
			res.status(405).json({
				message: `Método ${req.method} not allowed`,
			});
	}
}

const userSignin = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!isEmail(email)) {
			return res
				.status(422)
				.json({ message: "O e-mail deve ser um endereço de e-mail válido" });
		}

		const user = await User.findOne({
			where: { email: email },
		});

		if (!user) {
			return res
				.status(404)
				.json({ message: "A conta de usuário não existe" });
		}

		if (!user.email_confirmed) {
			return res.status(404).json({
				message:
					"O e-mail ainda não foi confirmado, por favor, confirme seu e-mail.",
			});
		}

		if (!user.status) {
			return res.status(404).json({
				message:
					"Esta conta está temporariamente desativada, entre em contato com o e-mail de suporte",
			});
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (passwordsMatch) {
			const elarniv_users_token = jwt.sign(
				{
					userId: user.id,
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					role: user.role,
					profile_photo: user.profile_photo,
				},
				process.env.JWT_SECRET,
				{ expiresIn: "7d" }
			);
			res.status(200).json({
				message: "Login bem-sucedido!",
				elarniv_users_token,
			});
		} else {
			res.status(401).json({ message: "A senha não está correta" });
		}
	} catch (e) {
		// console.error(error)
		res.status(400).json({
			error_code: "user_login",
			message: e.message,
		});
	}
};
