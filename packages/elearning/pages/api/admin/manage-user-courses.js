import { Enrolment } from "database/models";
import User from "database/models/user";

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
  const { userId, courses } = req.body;

  //return console.log(req.body)

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  try {
    for (const course of courses) {
      const enrol = await Enrolment.findOne({
        where: { userId: userId, courseId: course.value },
      });

      if (enrol) throw new Error("Enrolment already exists");

      await Enrolment.create({
        payment_method: "Manually Added",
        buyer_name: `${user.first_name} ${user.last_name}`,
        buyer_email: user.email,
        buyer_avatar: user.profile_photo,
        userId: userId,
        courseId: course.value,
        status: "paid",
      });
    }

    //await checkoutConfirmation(cartItems, buyer_name, buyer_email);

    res.status(200).json({
      message: "Enroled successfully.",
    });
  } catch (e) {
    res.status(400).json({
      error_code: "create_enroled",
      message: e.message,
    });
  }
};
