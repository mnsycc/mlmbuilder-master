const UserModel = require('models/user');
const CompanyModel = require('models/company');
const TreeModel = require('models/tree');

const createProfile = async (profile) => {
  const query = {
    'profile.username': profile.username,
    'profile.name': profile.name,
    'profile.surname': profile.surname,
  };
  const checkUser = await UserModel.findOne(query);
  console.log('profile: ', query);

  if (!checkUser) {
    const doc = await new UserModel({
      profile: {
        username: profile.username,
        name: profile.name,
        surname: profile.surname,
        email: profile.email,
        phone: profile.phone,
      },
    });
    await doc.save();
  }
};

const getProfile = async (profile) => {
  const query = {
    'profile.username': profile.username,
    'profile.name': profile.name,
    'profile.surname': profile.surname,
  };

  const doc = await UserModel.find(query);
  const uid = doc.map((value) => {
    return value.id;
  }).join();
  return uid;
};

const createCompany = async (company, uid) => {
  const query = {
    name: company.name,
    treeType: company.type,
  };

  const checkCompany = await CompanyModel.findOne(query);

  if (!checkCompany) {
    const doc = new CompanyModel({
      name: company.name,
      treeType: company.type,
      owner: uid,
      users: uid,
    });
    await doc.save();
  }
};
const getCompany = async (company) => {
  const query = {
    name: company.name,
    treeType: company.type,
  };

  const doc = await CompanyModel.find(query);
  const companyId = doc.map((value) => {
    return value.id;
  }).join();
  return companyId;
};

const getParent = async (parent) => {
  const query = {
    'profile.name': parent.name,
    'profile.surname': parent.surname,
  };

  const doc = await UserModel.find(query);
  const uid = doc.map((value) => {
    return value.id;
  }).join();
  return uid;
};

// первоначальное дерево(уже не нужно)
// const initParentTree = async (uid, companyId) => {
//   const checkTree = await TreeModel.findOne({
//     user: uid,
//   });

//   if (!checkTree) {
//     const ParentDoc = await new TreeModel({
//       referTree: [],
//       user: uid,
//       company: companyId,
//     });
//     await ParentDoc.save();
//     console.log('tree created');
//   }
//   console.log('ok');
// };

const createReferal = async (uid, parentId, companyId) => {
  // Нужен будеть чтобы узнать как распределить реферала в структуре. Пока делаем ток линейный.
  // const { treeType } = await CompanyModel.findById(companyId, 'treeType');
  console.log('parentId:', parentId);
  // находим родителя в структуре
  const parentDoc = await TreeModel.findOne({ user: parentId }, '_id referTree');
  console.log('parentDoc:', parentDoc);
  // берем реферТрее от родителя, добавляем к нему айди родителя и получим рефер трии для регистрируемого реферала
  const childTree = [...parentDoc.referTree, parentDoc.id];

  // Добавим информацио о человеке в пользователе в компанию

  await parentDoc.updateOne({
    $push: { referTree: uid },
  });

  await CompanyModel.updateOne({
    $push: { users: uid },
  });

  // создаем реферала
  const childDoc = await new TreeModel({
    referTree: [],
    user: uid,
    company: companyId,
  });

  console.log('childDoc:', childDoc);

  const child = await childDoc.save();

  const childId = await childDoc.id;
  return childId;
};

module.exports = {
  getProfile,
  getParent,
  createCompany,
  getCompany,
  createProfile,
  createReferal,
  // initParentTree,
};
