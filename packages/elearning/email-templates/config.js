import nodemailer from "nodemailer";
import mandrillTransport from 'nodemailer-mandrill-transport'


const {MANDRILL_USER, MANDRILL_API_KEY, MANDRILL_HOST, MANDRILL_PORT} = process.env
export const transport = nodemailer.createTransport({
	// Yes. SMTP!
	service: "SMTP",
	host: MANDRILL_HOST, // Amazon email SMTP hostname
	secureConnection: true, // use SSL
	port: MANDRILL_PORT, // port for secure SMTP
	auth: {
		user: MANDRILL_USER, // Use from Amazon Credentials
		pass: MANDRILL_API_KEY, // Use from Amazon Credentials
	},
});
