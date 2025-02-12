export interface IsuccessResponse {
    status: "ok";
    user: {
        id: number;
        username: string;
        email: string;
        role: string;
    };
}

export interface IerrorResponse {
    status: "error";
    message: string;
}

