const Errorhandler = (err,req,res,next) => {
    const resStatus = err.status || 500
    const resMssg = err.message || "Something went wrong!"
    res.status(resStatus)
    res.json({
        success: false,
        Statuscode: resStatus,
        message: resMssg
    });
};

module.exports = Errorhandler;