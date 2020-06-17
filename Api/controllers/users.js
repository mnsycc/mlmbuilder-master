const UserModel = require('models/user');
const CompanyModel = require('models/company');
const TreeModel = require('models/tree');

const createCompany = async (name, treeType) => {
  const doc = new CompanyModel({ name, treeType });
  const company = await doc.save();
  const id = company.id();
  return id;
};

const createProfile = async (profile) => {
  const checkUser = await UserModel.findOne({
    profile: {
      username: profile.username,
      name: profile.name,
      surname: profile.surname,
      email: profile.email,
      phone: profile.phone,
    },
  });

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
    const user = await doc.save();
    console.log('there is no user');
  }
  const uid = await checkUser.id;
  return uid;
};

const getProfile = async (parent) => {
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

const createReferal = async (uid, ParentId, companyId) => {
  // Нужен будеть чтобы узнать как распределить реферала в структуре. Пока делаем ток линейный.
  // const { treeType } = await CompanyModel.findById(companyId, 'treeType');

  // находим родителя в структуре
  const parentDoc = await TreeModel.find({ user: ParentId }, '_id referTree');
  // берем реферТрее от родителя, добавляем к нему айди родителя и получим рефер трии для регистрируемого реферала
  const childTree = [...parentDoc.referTree, parentDoc.id];

  // Добавим информацио о человеке в пользователе в компанию
  await CompanyModel.update(
    { _id: companyId },
    { $push: { user: ParentId } },
  );

  // создаем реферала
  const childDoc = new TreeModel({
    referTree: childTree,
    user: uid,
    company: companyId,
  });

  const childId = childDoc.id;
  return childId;
};

module.exports = {
  getProfile,
  createCompany,
  createProfile,
  createReferal,
};
