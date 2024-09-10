const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => {
        // Ensure next is called properly in case of error
        if (typeof next === 'function') {
          next(err);
        } else {
          // If next is not a function, send a fallback response
          res.status(500).json({
            success: false,
            message: err.message || 'Server error',
          });
        }
      });
    };
  };
  
  export { asyncHandler };
  