import express from 'express';
import { ConnectToMongo } from './db.js';
 import cors from 'cors'; 
import UserRoutes from './Routes/UserRouter.js';
import CousineRoutes from './Routes/CusineRoutes.js';
import CardRoutes from './Routes/CardRoutes.js'
import AuthRoutes from './Routes/AuthRoutes.js'
import recipes from './Routes/recipes.js'
import favoriteRoute from './Routes/favoriteRoute.js'

const app = express();
const port = 3000;

 app.use(cors());

ConnectToMongo(); // Connect to MongoDB

app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define routes
app.use('/user', UserRoutes);
app.use('/cusine', CousineRoutes);
app.use('/card', CardRoutes);
app.use('/auth', AuthRoutes);
app.use('/recipes',recipes);
app.use('/favorites',favoriteRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
