export interface IUsersApi {
    _id: string,
    username: string,
    email: string,
    credit: number,
    role: "user" | "admin",
    title: string,
    verified: boolean,
    code: string,
    confirmation: string,
    confirmation_expiration: number,
    createdAt: number,
};