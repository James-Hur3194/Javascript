const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./api/admin/auth');
const adminProductsRouter = require('./api/products');
const productsRouter = require('./api/products');
const cartsRouter = require('./api/carts');

const app = express();

app.use(express.static('public'));
// default url encode doesn't work for multipart encode
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  keys: ['aljdfkldjfkldj']
}));
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.get('/signup', (req, res) => {
  res.send(`
    <div>
      Your id is: ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
})

// const bodyParser = (req, res, next) => {
//   if (req.method = 'POST') {
//     req.on('data', data => {
//       const parsed = data.toString('utf8').split('&');
//       const formData = {};
//       for (let pair of parsed) {
//         const [key, value] = pair.split('=');
//         formData[key] = value;
//       }
//       req.body = formData;
//       next();
//     });
//   } else {
//     next();
//   }
// }



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});