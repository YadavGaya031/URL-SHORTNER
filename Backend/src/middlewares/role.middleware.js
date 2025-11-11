export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({
                message: "Unauthorized: Login Required"
            })
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message: "Forbidden: you do not have access."
            });
        }
        next();
    }
}