class ErrorResponse {
    constructor(message, code, data) {
        this.message = message;
        this.code = code;
        this.data = data;
    }

}

module.exports = ErrorResponse