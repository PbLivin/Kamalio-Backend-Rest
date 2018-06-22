export function errorWrap(handler) {
    return function (...args) {
        handler(...args).catch(args[args.length - 1])
    }
}

export function assertOrThrow(statement, errorType, ...errorArgs) {
    if (!statement) {
        throw new errorType(...errorArgs)
    }
}

export const JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/
