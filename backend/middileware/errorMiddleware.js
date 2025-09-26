exports.errorHandler=(err,req,res,next)=>{
    console.error(err.stack);
    const status =res.statusCode===200?500:res.statusCode;
    res.status(status).json({
        message:err.message || `server Error`,
        stack:process.env.Node_Env==='production'? '🥞' : err.stack
    });
}