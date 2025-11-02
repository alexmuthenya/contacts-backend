import { constants } from "../constants.js"
export function errorHandler(err, req, res, next){
    const statusCode = res.statusCode ? res.statusCode : 500 
    res.status(statusCode)

    switch(statusCode){
        case constants.VALIDATION_ERROR:
                return res.json({
                    title: "Validation failed",
                    message: err.message, 
                    stackTrace: process.env.NODE_ENV === "production" ? undefined : err.stack})
        case constants.NOT_FOUND:
             return res.json({
                    title: "Not Found",
                    message: err.message, 
                    stackTrace: process.env.NODE_ENV === "production" ? undefined : err.stack})
        case constants.FORBIDDEN:
             return res.json({
                    title: "Forbidden",
                    message: err.message, 
                    stackTrace: process.env.NODE_ENV === "production" ? undefined : err.stack})
           
        case constants.UNAUTHORIZED:
             return res.json({
                    title: "Unauthorized",
                    message: err.message, 
                    stackTrace: process.env.NODE_ENV === "production" ? undefined : err.stack})
        
        case constants.SERVER_ERROR:
        default:
             return res.json({
                    title: "Internal server error",
                    message: err.message, 
                    stackTrace: process.env.NODE_ENV === "production" ? undefined : err.stack})
            
    }
        
        
}