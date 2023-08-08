import Notification from "../../../database/models/notification";
import User from "../../../database/models/user";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await findUser(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
  }
}

const findUser = async (students) => {
  try {
    console.log(students);
    const user = await User.findOne({ where: { id: students } });
    console.log(user.first_name);
    return user ? user : null;
  } catch (error) {
    throw new Error("Error al buscar el usuario en la base de datos");
  }
};

const handleDeleteRequest = async (req, res) => {
  const { notificationId } = req.query;

  try {
    // Elimina la notificación de la base de datos
    await Notification.destroy({ where: { id: notificationId } });

    res.status(200).json({
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(400).json({
      error_code: "delete_notification",
      message: "Error deleting notification",
    });
  }
};

const handlePostRequest = async (req, res) => {
  const { title, message, link, icon, userId } = req.body;
  //console.log(req.body);
  try {
    if (!title || !message) {
      return res.status(422).json({
        message: "Title and message must be provided",
      });
    }

    if (userId === "all") {
      const users = await User.findAll();
      for (const user of users) {
        await Notification.create({
          title,
          message,
          link,
          icon,
          userId: user.id,
        });
      }
    } else {
      // Find userId by email
      const targetUserId = await findUser(userId);
      //console.log(targetUserId)
      if (!targetUserId) {
        return res.status(422).json({
          message: "User not found",
        });
      }
      await Notification.create({
        title,
        message,
        link,
        icon,
        userId: targetUserId.id,
      });
    }

    res.status(200).json({
      message: "New notification added",
    });
  } catch (e) {
    res.status(400).json({
      error_code: "create_notification",
      message: e.message,
    });
  }
};
