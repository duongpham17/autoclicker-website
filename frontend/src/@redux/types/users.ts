export interface IUsersApi {
    _id: string,
    username: string,
    email: string,
    credit: number,
    role: "user" | "admin",
    createdAt: number,
};