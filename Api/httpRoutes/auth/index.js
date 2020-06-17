const express = require('express');

const router = express.Router();

const multer = require('multer');

const upload = multer();

const profileCtr = require('controllers/users');
const companyCtr = require('controllers/users');
const treeCtr = require('controllers/users');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login', upload.none(), async (req, res) => {
  // создание профиля юзера
  const { createProfile } = profileCtr;
  // console.log(req.body);

  const uid = await createProfile(req.body);
  console.log('uid: ', uid);

  // чтобы создать рефера, нужно передать в трии айди родтеля, юзера и компанию

  const { getProfile } = profileCtr;
  const parentId = await getProfile(req.body);

  console.log('parentId: ', parentId);

  // const { createReferal } = treeCtr;
  // const referelID = await createReferal(parentId);

  // console.log(referelID);
});

module.exports = router;
