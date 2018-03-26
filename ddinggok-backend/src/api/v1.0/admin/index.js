const Router = require('koa-router');
const multer = require('koa-multer');
const admin = new Router();
const cmd = require('node-cmd');

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: async function(req, file, cb) {
      await cb(null, file.originalname);
      try {
        cmd.run(
          `
            ffmpeg -t 5 -i uploads/"${file.originalname}" -acodec copy uploads/p"${file.originalname}"
            rm uploads/"${file.originalname}"
          `
        );
      } catch(error) {
        console.error(err);
      }
    }
  })
})

admin.post('/add/song', upload.single('music'), (req, res, next) => {
  console.log(req.file, req.files);
});

module.exports = admin;