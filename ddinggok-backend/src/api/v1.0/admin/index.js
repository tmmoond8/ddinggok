const Router = require('koa-router');
const multer = require('koa-multer');
const admin = new Router();
const cmd = require('node-cmd');
const queryString = require('query-string');
const NodeID3 = require('node-id3');
const fs = require('fs');

const Singer = require('db/models/Singer');
const { makeRandomString } = require('lib/util');

const PUBLIC_TMP = 'public/tmp/';

const uploadSong = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/tmp/');
    },
    filename: async function(req, file, cb) {
      const params = queryString.parse(req._parsedUrl.query);
      const tmpFIleName = makeRandomString();
      const srcFilePath = `${PUBLIC_TMP}"${tmpFIleName}"`;
      const singer = await Singer.findByName(params.singerName);
      // console.log(singer);
      let music;
      await cb(null, tmpFIleName);
      await fs.readFile(`public/tmp/${tmpFIleName}`, (err, data) => {
        if(err) throw err;
        let tags = NodeID3.read(data);
        const {title, artist, year, genre} = tags;
        const imageBuffer = Buffer(tags.image.imageBuffer, 'ascii');
        const base64Encoded = imageBuffer.toString('base64');
        music = {
          title,
          artist,
          year,
          genre,
          conver: base64Encoded,
          filename: file.originalname
        }
        singer.musics = singer.musics.concat(music);
        singer.save();
      });
      try {
        await cmd.run(
          `
            rm public/music/"${file.originalname}"
            ffmpeg -t 5 -i ${srcFilePath} -acodec copy public/music/"${file.originalname}"
            rm ${srcFilePath}
          `
        );
        // music.filename = file.originalname;
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

admin.post('/add/song', async (req, res, next) => {
  const {name} = req.query;
  let singer = await Singer.findByName(name);
  uploadSong.single('music')(req, res, function(err) {});
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