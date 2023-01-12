const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const messageSchema = mongoose.Schema(
  {
    userId: reqString,
    text: reqString,
  },
  {
    timestamps: true,
  }
)

const userSchema = mongoose.Schema(
  {
    email: reqString,
    username: reqString,
    password: reqString,
    messages: [messageSchema],
    nameHistory: [String],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('users', userSchema)



const mongo = require('./mongo')
const userSchema = require('./schemas/user-schema')
const mongoose = require('mongoose')
const { mongoPath } = require('./config.json')

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  return mongoose
}

const connectToMongoDB = async () => {
  await mongo().then(async (mongoose) => {
    try {
      console.log('Connected to mongodb!')

      const email = 'test@test.com'

      // Insert nested documents
      await new userSchema({
        email,
        username: 'testing',
        password: 'pass',
        messages: [
          {
            userId: email,
            text: 'hello world',
          },
          {
            userId: email,
            text: 'hello world 2',
          },
          {
            userId: email,
            text: 'hello world 3',
          },
        ],
      }).save()

      // Search for nested documents
      const results = await userSchema.findOne({
        'messages.text': 'hello world 2',
      })

      console.log('RESULTS:', results)
    } finally {
      mongoose.connection.close()
    }
  })
}

connectToMongoDB()



// app.get("/fetch/:COUNTRY/:STATE, function (req, res) {
//   fetchCOUNTRY = req.params.COUNTRY;
//   fetchSTATE = req.params.STATE;
//   newmodel.find({}, function (err, val) {
//     res.send(val);
//   });
// });
// app.get("/COUNTRY/:COUNTRY/STATE/:STATENAME", (req, res, next) => {
//   const id = req.params.COUNTRY;
//   const name = req.params.STATENAME;
//   newmodel.find({$and: [ { 'COUNTRY': id }  ,{'STATE': {'$elemMatch':{'STATENAME':name}} }]})
//   .select("STATE")
//     .exec()
//     .then((docs) => {
//       res.status(200).json(docs);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });


// app.post("/country/:country_id", (req, res, next) => {
//   const id = req.params.countryId;
//   const states = {stateName: req.body.stateName}
//   const country = {State:states};
//   Address.findOneAndUpdate(
//     { _id: id },
//     { $push: {"Country":{ State: {stateName: req.body.stateName}} }})
//     .then((result) => {
//       console.log({ result });
//       res.status(201).json({
//         message: "data add",
//         result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });
