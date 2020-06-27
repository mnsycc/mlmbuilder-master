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
  await createProfile(req.body.profile);

  const { getProfile } = await profileCtr;
  const uid = await getProfile(req.body.profile);
  console.log('uid: ', uid);

  // создание компании
  const { createCompany } = await companyCtr;
  await createCompany(req.body.company, uid);

  const { getCompany } = await companyCtr;
  const companyId = await getCompany(req.body.company);
  console.log('companyId: ', companyId);

  // первоначальное дерево(уже не нужно)
  // const { initParentTree } = treeCtr;
  // const tree = await initParentTree(uid);


  // чтобы создать рефера, нужно передать в трии айди родтеля, юзера и компанию
  const { getParent } = await profileCtr;
  const parentId = await getParent(req.body.parent);

  console.log('parentId: ', parentId);

  const { createReferal } = await treeCtr;
  const referelId = await createReferal(uid, parentId, companyId);

  console.log(referelId);
});

module.exports = router;
