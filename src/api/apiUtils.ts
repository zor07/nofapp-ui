import {ErrorResponse, ResponseType} from "./api";

export const isTokenExpired = (response : ResponseType<ErrorResponse>) : boolean => {
    return response.status === 403 && response.data.error_message.includes('The Token has expired');
}