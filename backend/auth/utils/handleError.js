
const handleHttpError = (res, message="algo anda mal",code=403) => {
    res.status(code);
    res.send({ error: message });
};

module.exports= { handleHttpError }