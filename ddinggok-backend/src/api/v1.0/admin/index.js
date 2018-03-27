const Router = require('koa-router');
const multer = require('koa-multer');
const admin = new Router();
const cmd = require('node-cmd');
const Singer = require('db/models/Singer');
const queryString = require('query-string');
const { makeRandomString } = require('lib/util');

const uploadSong = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/tmp/');
    },
    filename: async function(req, file, cb) {
      console.log('filename',req.url);
      await cb(null, file.originalname);
      try {
        cmd.run(
          `
            ffmpeg -t 5 -i public/tmp/"${file.originalname}" -acodec copy public/music/"${file.originalname}"
            rm public/tmp/"${file.originalname}"
          `
        );
      } catch(error) {
        console.error(err);
      }
    }
  })
})


const uploadSinger = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/singer/');
    },
    filename: async function(req, file, cb) {
      const params = queryString.parse(req._parsedUrl.query);
      const singer = await Singer.findByName(params.name);
      const ext = file.originalname.split(".")[1];
      const filename = `${params.name}_${makeRandomString()}.${ext}`;
      await cb(null, file.originalname);
      console.log('random' + makeRandomString());
      try {
        cmd.run(
          `
            mv public/singer/"${file.originalname}" public/singer/${filename}
          `
        );
        singer.images.push({filename: filename, base64: 'base64'})
        singer.save();
      } catch(error) {
        console.error(err);
      }
    }
  })
})

admin.post('/add/song', uploadSong.single('music'), (req, res, next) => {
  console.log(req.query);
});

admin.post('/add/singer', async (req, res, next) => {
  const {name, displayName} = req.query;
  let user = await Singer.createSinger({
    name,
    displayName
  });
  uploadSinger.array('image')(req, res, function(err) {
    
  })
});

module.exports = admin;