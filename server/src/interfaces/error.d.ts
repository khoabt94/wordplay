export interface CustomErrorContent {
    message: string,
    context?: { [key: string]: any }
};

export interface ErrorConstructorParams {
    message: string,
    statusCode: number
    [key: string]: any
}