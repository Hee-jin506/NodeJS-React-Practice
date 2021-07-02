const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require('./config/key');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

app.post('/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 데이터 베이스에 요청한 email이 있다면, 비밀번호가 유효한지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

      // 비밀번호까지 맞다면 유저를 위한 토큰 생성한다.
      user.generateToken((err, user) => {

      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})