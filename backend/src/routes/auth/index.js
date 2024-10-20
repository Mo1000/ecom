const express = require('express');
const UserClass = require('../../classes/UserClass.js');
const logger = require('../../logger');

const auth = express.Router();

// auth.post('/login', async (req, res) => {
//   const { email, password } = req?.body;
//   if (email && password) {
//     try {
//       const login = await UserClass.loginWithEmail(email, password);
//       return res.status(login.status).json(login); // Send success response
//     } catch (error) {
//       // Send error response if the `loginWithEmail` function throws an error
//       return res.status(400).json({ status: 400, message: error.message });
//     }
//   } else {
//     // Handle the case where email or password is missing
//     return res
//       .status(400)
//       .json({ status: 400, message: 'Email and password are required' });
//   }
// });

const authMiddleware = async (req, res, next) => {
  const sessionToken = req.headers['X-Parse-Session-Token']; // Utilisez l'en-tête approprié pour Parse
  if (!sessionToken) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: No session token provided' });
  }

  try {
    const user = await Parse.User.become(sessionToken); // Valider le token de session et récupérer l'utilisateur
    if (user) {
      req.user = user; // Attacher l'utilisateur validé à l'objet `req`
      next(); // Continuer vers la route suivante
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: Invalid session token' });
  }
};
module.exports = auth;
