const multer = require('multer')

class FileUpload {
  constructor() {
    const storage = multer.diskStorage({
      destination: 'src/storage/public',
      filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1]
        cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
      }
    })

    this.upload = multer({ storage })
  }
}

module.exports = new FileUpload()