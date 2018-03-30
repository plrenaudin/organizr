module.exports = (req,res, next) => {
    res.noCache()
    next();
}