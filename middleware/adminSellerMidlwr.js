export const isAdminSeller = (req, res, next) => {
  
  if (req.user && (req.user.role === "admin" || req.user.role === "seller") ) {
   
    next(); 
  } else {
    return res.status(403).json({ 
      success: false, 
      message: "Access denied. Admin and seller can only sell/create products." 
    });
  }
};
