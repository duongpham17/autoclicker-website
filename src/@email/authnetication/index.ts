import { Email, email_address } from '../index';
import { AUTHENTICATION } from './template';

export interface IAuthentication {
    email: string,
    code: string,
};

export const Signup = async (data: IAuthentication) => {
    const transporter = Email();
    const mailOptions = {
        from: `${email_address} <${email_address}>`,
        to: data.email,
        subject: "Confirm Email",
        html: AUTHENTICATION(data)
    }
    await transporter.sendMail(mailOptions);
};

export const Login = async (data: IAuthentication) => {
    const transporter = Email();

    const mailOptions = {
        from: `${email_address} <${email_address}>`,
        to: data.email,
        subject: `Login Code: ${data.code}`,
        html: AUTHENTICATION(data)
    };
    await transporter.sendMail(mailOptions);
};

export const Forgot = async (data: IAuthentication) => {
    const transporter = Email();

    const mailOptions = {
        from: `${email_address} <${email_address}>`,
        to: data.email,
        subject: `Forgot Password Code`,
        html: AUTHENTICATION(data)
    };
    await transporter.sendMail(mailOptions);
};