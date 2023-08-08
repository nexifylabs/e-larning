import Notification from "../../../database/models/notification";

export default async function handler(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No authorization token" });
  }

  switch (req.method) {
    case "DELETE":
      await handleDelete(req, res);
      break;
    default:
      res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

const handleDelete = async (req, res) => {
  if (req.method === "DELETE") {
    const { notificationMessage } = req.query;
    if (!notificationMessage) {
      return res.status(400).json({ message: "Missing parameter" });
    }

    try {
      const notificaciones = await Notification.findAll({
        where: { message: notificationMessage },
      });
      if (notificaciones.length > 0) {
        const ids = notificaciones.map((notificacion) => notificacion.id);
        await Notification.destroy({ where: { id: ids } }); // Elimina todas las notificaciones con el mismo ID
        res
          .status(200)
          .json({ message: "Notificationes deleted successfully." });
      } else {
        res.status(404).json({ message: "Notification not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
};
