export class InvalidArgumentsError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = "InvalidArgumentsError";
    }
}

export class UnsupportedSessionTypeError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = "UnsupportedSessionTypeError";
    }
}