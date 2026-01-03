const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { upload, processImage } = require('../middlewares/upload');

// @desc    Upload une image
// @route   POST /api/upload
// @access  Private
router.post(
'/',
protect,
upload.single('image'),
processImage,
(req, res) => {
if (!req.file) {
return res.status(400).json({
success: false,
message: 'Aucune image fournie',
});
}

res.status(200).json({
success: true,
message: 'Image uploadée avec succès',
data: {
filename: req.file.filename,
path: req.file.path,
},
});
}
);

module.exports = router;
