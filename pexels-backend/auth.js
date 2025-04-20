// const express = require("express");
// const session = require("express-session");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



require('dotenv').config(); // Pour lire le fichier .env
const axios = require('axios');


const app = express();
app.use(express.json());
app.use(express.static("public"));

const cors = require("cors");
app.use(cors());

  

// app.get('/', (req, res) => {
//     console.log('Session actuelle :', req.session);
//     res.send('Hello!');
//   });

// Utilisez le middleware cors pour autoriser les requêtes cross-origin
// Pour autoriser une origine spécifique :
const corsOptions = {
    origin: 'https://chico-webdev.github.io',
    // Vous pouvez ajouter d'autres options comme les méthodes HTTP autorisées, les headers, etc.
  };
  app.us
  
  

  const allowedOrigins = ['https://chico-webdev.github.io', 'http://127.0.0.1:5500'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Autoriser les requêtes depuis n'importe quelle origine (à sécuriser plus tard si besoin)
// const cors = require('cors');
// app.use(cors({
//     origin: 'http://127.0.0.1:5500', // l'origine de ton front
//     credentials: true               // autorise les cookies/sessions
//   }));


// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false, // en prod : true avec HTTPS
//       httpOnly: true,
//       sameSite: 'lax'
//     }
//   }));

//   app.get("/api/test-session", (req, res) => {
//     res.json({ session: req.session });
//   });
  
  

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/auth/google/callback"
// }, (accessToken, refreshToken, profile, done) => {
//   return done(null, profile); // profil utilisateur
// }));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Routes d'authentification
// /*app.get("/auth/google", passport.authenticate("google", {
//   scope: ["profile", "email"],
//   prompt: 'select_account' // <- demande de rechoisir le compte
// }));*/
// app.get("/auth/google", (req, res) => {
//     const redirect_uri = "https://accounts.google.com/o/oauth2/v2/auth?" +
//       "client_id=GOOGLE_CLIENT_ID" +
//       "&redirect_uri=http://localhost:3000/auth/google/callback" +
//       "&response_type=code" +
//       "&scope=openid%20email%20profile";
  
//     res.redirect(redirect_uri);
//   });
  


// /*app.get("/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/",
//     successRedirect: "/"
//   })
// );*/

// // app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// /*app.get('/auth/google/callback', passport.authenticate('google', {
//     failureRedirect: "/login",
//     successRedirect: "http://127.0.0.1:5500/index.html" // <- redirection vers ton frontend
// }));*/

// /*app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//       // Ici on a accès à req.user grâce à Passport
//       req.session.user = {
//         name: req.user.displayName,
//         photo: req.user.photos[0].value
//       };
//       res.redirect('http://127.0.0.1:5500/index.html');
//     }
//   );*/
//   app.get("/auth/google/callback", async (req, res) => {
//     const code = req.query.code;
  
//     // On échange le code contre un token d’accès
//     const { data } = await axios.post("https://oauth2.googleapis.com/token", {
//       code,
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET,
//       redirect_uri: "http://localhost:3000/auth/google/callback",
//       grant_type: "authorization_code"
//     });
  
//     const { access_token } = data;
  
//     // On récupère les infos de l'utilisateur
//     const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//       headers: {
//         Authorization: `Bearer ${access_token}`
//       }
//     });
  
//     // Ensuite : on envoie ça au frontend ou on le stocke
//     res.redirect(`http://localhost:5500?user=${encodeURIComponent(JSON.stringify(userInfo.data))}`);
//   });
  
  



// app.get('/logout', (req, res) => {
//     req.logout(err => {
//       if (err) return next(err);
//       req.session.destroy(() => {
//         res.clearCookie('connect.sid'); // Supprime le cookie de session
//         res.redirect('http://127.0.0.1:5500/index.html'); // Redirige vers la page d’accueil (ou une autre page si tu veux)
//       });
//     });
//   });
  
  

// /*app.get('/api/user', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({
//       isLoggedIn: true,
//       name: req.user.displayName,
//       photo: req.user.photos[0].value
//     });
//   } else {
//     res.json({ isLoggedIn: false });
//   }
// });
// */

// app.get("/api/user", (req, res) => {
//     if (req.isAuthenticated()) {
//       const user = req.session.user || {
//         name: req.user.displayName,
//         photo: req.user.photos[0].value
//       };
//       res.json({ isLoggedIn: true, ...user });
//     } else {
//       res.json({ isLoggedIn: false });
//     }
//   });
  
  



// // // API sécurisée pour recevoir le commentaire
// // app.post("/api/comment", (req, res) => {
// //   if (req.isAuthenticated()) {
// //     console.log("Commentaire reçu :", req.body.comment);
// //     res.send({ success: true });
// //   } else {
// //     res.status(401).send({ error: "Non authentifié" });
// //   }
// // });

// // // Route pour interroger l'API Pexels via ton backend
// // app.get("/api/search", async (req, res) => {
// //   const { query, per_page } = req.query;

// //   if (!query) {
// //     return res.status(400).json({ error: "Paramètre 'query' manquant." });
// //   }

// //   try {
// //     const response = await axios.get("https://api.pexels.com/v1/search", {
// //       headers: {
// //         Authorization: process.env.PEXELS_API_KEY,
// //       },
// //       params: {
// //         query: query,
// //         per_page: per_page || 39,
// //       },
// //     });

// //     res.json(response.data);
// //   } catch (error) {
// //     console.error("Erreur avec l'API Pexels :", error.message);
// //     res.status(500).json({ error: "Erreur lors de la récupération des images." });
// //   }
// // });

// // app.listen(3000, () => {
// //   console.log("Serveur lancé sur http://localhost:3000");
// // });




// // === SESSION ===
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
// }));

// // === PASSPORT INIT ===
// app.use(passport.initialize());
// app.use(passport.session());

// // === SERIALISATION ===
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// // === GOOGLE STRATEGY ===
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL,
// },
// (accessToken, refreshToken, profile, done) => {
//   // 🔥 Ici tu récupères les données utilisateur
//   return done(null, profile);
// }));

// // === ROUTES ===
// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Connexion Google</a>');
// });

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // ✅ Connexion réussie
//     res.redirect('/profile');
//   }
// );

// app.get('/profile', (req, res) => {
//   if (!req.user) return res.redirect('/');
  
//   res.send(`
//     <h1>Bienvenue ${req.user.displayName}</h1>
//     <p>Email: ${req.user.emails[0].value}</p>
//     <img src="${req.user.photos[0].value}" />
//     <br><a href="/logout">Se déconnecter</a>
//   `);
// });

// app.get('/logout', (req, res) => {
//   req.logout(() => {
//     res.redirect('/');
//   });
// });


// Route pour interroger l'API Pexels via ton backend
app.get("/api/search", async (req, res) => {
  const { query, per_page } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Paramètre 'query' manquant." });
  }

  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query: query,
        per_page: per_page || 39,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Erreur avec l'API Pexels :", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des images." });
  }
});

// === LANCER LE SERVEUR ===
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur ${port}`);
});
