

const verifyRole = (req, res, next) => {
   
    if (req.user && req.user.role === 'admin') {
        console.log('User has admin role',req.user.role);
      
      next();
    } else {
      
      return res.status(403).json({ message: 'Permission denied. Admin access required.' });
    }
  };
  
  module.exports = verifyRole;
  