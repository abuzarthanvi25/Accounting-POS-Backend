const responseHandler = (response ,responseCode, error, message) => {
    return response.status(responseCode).json({
        message: message,
        status: false,
        error: error ?? null
    })
}

module.exports = [responseHandler]