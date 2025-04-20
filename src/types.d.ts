
interface ApiResponse<T> {
    statusCode: number;
    message?: string;
    data: T;
}

interface Student {
    token: string;

    barcode: number;
    name: string;
    surname: string;

    group: {
        name: string;
    };
}

interface IClub {
    id: string;
    title: string;
    description: string;
    logo: string;
    banner: string;
    members: IMember[];
}

interface IMember {
    id: string;
    barcode: number;
    name: string;
    surname: string;
    admin?: boolean;
}

interface IMemberClub {
    title: string;
}

export {
    ApiResponse,
    Student,
    IClub,
    IMember,
    IMemberClub
}