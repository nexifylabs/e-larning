import Notificacion from "../../../database/models/notification";

export default async function handler(req, res) {
	const { notificacion } = req.body;

	try {
		if (!notificacion) {
			return res.status(422).json({
				message: "Invalid notificacion code",
			});
		}

		const discount = await Notificacion.findOne({
			where: { code: notificacion, active_for_full_site: true },
		});

		if (discount) {
			res.status(200).json({ message: "Notificacion code applied", discount });
		} else {
			res.status(422).json({ message: "There is no any notificacion code" });
		}
	} catch (e) {
		res.status(400).json({
			error_code: "create_notificacion",
			message: e.message,
		});
	}
}
