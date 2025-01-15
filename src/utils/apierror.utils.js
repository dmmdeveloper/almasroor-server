export class APIError extends Error {
    constructor( message = "Something Went Wrong" , stauscode) {
        super(message)
        this.message = message;
        this.stauscode  =stauscode;
    }
}