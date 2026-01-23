export const isSeller = (req, res, next) => {
  
  if (req.user && req.user.role === "seller" ) {
    res.status(200).json({
      success:true,
      message:"Seller can only sell products"
    })
    next(); 
  } else {
    return res.status(403).json({ 
      success: false, 
      message: "Access denied. seller resources only." 
    });
  }
};