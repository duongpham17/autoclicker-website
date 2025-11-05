import { Email, email_address } from '../index';
import { AUTHENTICATION } from './template';

interface Authentication {
    email: string,
    code: string,
    host: string
};

export const EMAIL_SIGNUP = async (data: Authentication) => {
    const transporter = Email();
    const mailOptions = {
        from: `${email_address} <${email_address}>`,
        to: data.email,
        subject: "Confirm Email",
        html: AUTHENTICATION({
            host: data.host,
            code: data.code,
        })
    }
    await transporter.sendMail(mailOptions);
};

export const EMAIL_LOGIN = async (data: Authentication) => {
    const transporter = Email();

    const mailOptions = {
        from: `${email_address} <${email_address}>`,
        to: data.email,
        subject: `Login Code: ${data.code}`,
        html: AUTHENTICATION({
            code: data.code,
            host: data.host
        })
    };
    await transporter.sendMail(mailOptions);
};