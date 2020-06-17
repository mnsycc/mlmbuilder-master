/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const send = document.querySelector('.form_btn');

send.addEventListener('click', (ev) => {
  ev.preventDefault();
  const b = async () => {
    const profile = {
      username: document.querySelector('.form_username').value,
      name: document.querySelector('.form_name').value,
      surname: document.querySelector('.form_surname').value,
      email: document.querySelector('.form_email').value,
      phone: document.querySelector('.form_phone').value,
      date: Date.now(),
    };
    const parent = {
      name: document.querySelector('.form_parent_name').value,
      surname: document.querySelector('.form_parent_surname').value,
    };
    const company = document.querySelector('.form_company').value;

    console.log(profile, parent, company);
    // eslint-disable-next-line no-undef
    axios.post('/auth/login', profile, parent, company);
  };
  b();
});
