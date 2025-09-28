const checkRole = (roles) => (req, res, next) => {
    // req.user is set by the previous authMiddleware
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied. You do not have the required role.' });
    }
    next();
};

module.exports = checkRole;