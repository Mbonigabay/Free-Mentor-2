import express from 'express';
import path from 'path';
import router from '../app/routes/routes';


const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(router);

app.use((req, res) => {
    return res.status(404).json({
        status: 404,
        error: 'not found!',
    });
  });



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;