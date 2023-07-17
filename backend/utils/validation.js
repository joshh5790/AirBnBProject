const { validationResult } = require('express-validator')

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        const errors = {}
        validationErrors
            .array()
            .forEach(error => {
                errors[error.path] = error.msg
            })

        const err = new Error('Bad request')
        err.errors = errors
        err.status = 400
        next(err)
    }
    next()
}

module.exports = { handleValidationErrors }
