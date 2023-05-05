export interface IResponseHome {
    status: number,
    message: string;
    data: ICCard[]
}
export interface ICCard {
    titulo: string;
    valor: string;
    routeApp: string;
    color: string;
    icon: string;
}