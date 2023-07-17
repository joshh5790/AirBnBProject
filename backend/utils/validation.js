const { validationResult } = require('express-validator')

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        const errors = {}
        validationErrors
            .array()
            .forEach(error => {
                console.log("#()$&)*&", Object.keys(error), error.path)
                errors[error.path] = error.msg
            })

        const err = new Error('Bad request')
        err.errors = errors
        err.status = 400
        err.title = 'Bad request'
        next(err)
    }
    next()
}

module.exports = { handleValidationErrors }
