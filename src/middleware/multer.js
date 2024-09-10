const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originame)
    }
  })
  
  const upload = multer({ storage: storage })