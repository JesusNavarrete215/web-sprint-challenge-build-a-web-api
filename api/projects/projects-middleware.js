function projectHandleError(err, req, res, next){
    res.status(err.status || 500).json({message: err.message, prodMessage: 'something went wrong'})
}

module.exports = {projectHandleError}