// Storage.js
// add storage.js to your app.use()

var multer = require('multer')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const { CLOUD_NAME, API_KEY, API_SECRET } = require('../config')

const router = express.Router()

// Account access information
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
})
// Uploading Image Configuration
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'images',
  allowedFormats: ['jpg', 'png'],
  transformation: [
    { if: 'w_gt_1900', width: 1900, crop: 'scale' },
    { if: 'h_gt_1900', height: 1900, crop: 'scale' },
    { quality: 'auto' },
    { format: 'jpg' },
  ],
})
const parser = multer({ storage: storage })

router.post('/upload', parser.single('file'), (req, res) => {
  const imageUUID = req.file.public_id

  //Code to store imageUUID in your database

  res.json(imageUUID) // Return the UUID to the front end like this if necessary
})

module.exports = router
