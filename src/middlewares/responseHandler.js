function response_generic(res, number, success, message = "", data = []) {
    const finalData = {
        message: message,
        success: success,
        data: data
    }
    return res.status(number).json(finalData);
}

function response_success(res, message, data) {
    return response_generic(res, 200, true, message, data);
}

export { response_generic, response_success }