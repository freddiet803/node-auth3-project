const db = require('../dbConfig.js');

module.exports = {
  addUser,
  find,
  findByName,
  remove
};

function addUser(user) {
  return db('users').insert(user);
}

function find() {
  return db('users');
}

function findByName(username) {
  return db('users').where(username);
}

function remove(id) {
  return db('users')
    .del()
    .where({ id });
}
