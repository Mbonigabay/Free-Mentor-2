import '@babel/polyfill';
import express from 'express';
import helper from '../app/middleware/helper';
import router from '../app/routes/routes';



const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(router);

app.use(function (req, res, next) {
    const result = helper.failure('page not found', 404);
    return res.status(404).json(result);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;