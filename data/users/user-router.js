const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js');
const auth = require('../middleware/auth-middleware.js');
const Users = require('./user-model.js');

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    department: user.dept_id
  };

  const options = {
    expiresIn: '2h'
  };

  const token = jwt.sign(payload, secrets.jwtSecret, options);
  //console.log(token);
  return token;
}

router.post('/register', (req, res) => {
  const user = req.body;

  if (user.username && user.password && user.dept_id) {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.addUser(user)
      .then(newUser => {
        const token = generateToken(newUser);
        res.status(201).json({ message: 'User added!', token: token });
      })
      .catch(err => {
        res.status(500).json({ message: 'user could not be added' });
      });
  } else {
    res.status(400).json({ message: 'Please provide credentials' });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    Users.findByName({ username })
      .first()
      .then(userExist => {
        if (userExist && bcrypt.compareSync(password, userExist.password)) {
          const token = generateToken(userExist);
          res.status(200).json({
            message: `${userExist.username} logged in!`,
            token: token
          });
        } else {
          res.status(500).json({ message: 'user does not exist' });
        }
      });
  } else {
    res.status(400).json({ message: 'please provide credentials' });
  }
});

router.get('/', auth, (req, res) => {
  Users.find()
    .then(allUsers => {
      if (allUsers) {
        res.status(200).json(allUsers);
      } else {
        res.status(500).json({ message: 'no users exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error retrieving users from database' });
    });
});

module.exports = router;
