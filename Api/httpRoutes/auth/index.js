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
  const { createProfile } = await profileCtr;
  // console.log(req.body);

  const uid = await createProfile(req.body.profile);
  console.log('uid: ', uid);

  // const { initParentTree } = treeCtr;
  // const tree = await initParentTree(uid);

  // чтобы создать рефера, нужно передать в трии айди родтеля, юзера и компанию

  const { getProfile } = await profileCtr;
  const parentId = await getProfile(req.body.parent);

  console.log('parentId: ', parentId);

  const { createReferal } = await treeCtr;
  const referelId = await createReferal(uid, parentId);

  console.log(referelId);
});

module.exports = router;
