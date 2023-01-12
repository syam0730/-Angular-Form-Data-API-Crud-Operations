const express = require("express");
const { body, validationResult } = require('express-validator');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/MY",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Database connected");
    else console.log("Database error");
  }
);
const reqString = {
  type: String,
  required: true,
};
const districtSchema = mongoose.Schema({
  DISTRICTNAME: reqString,
});
const stateSchema = mongoose.Schema({
  STATENAME: reqString,
  DISTRICT: [districtSchema],
});
const userSchema = mongoose.Schema({
  COUNTRY: reqString,
  STATE: [stateSchema],
});
const newmodel = mongoose.model("users", userSchema);


app.post("/country", (req, res) => {
  console.log("Inside post function");
  const data = new newmodel({
    COUNTRY: req.body.COUNTRY,
    STATE: req.body.STATE,
    DISTRICT: req.body.DISTRICTNAME,
  });
  const val = data.save();
  if (val == null) {
    res.send({
      status: false,
      message: "Errorr",
    });
  } else {
    res.send({
      status: true,
      message: "Data Posted Successfully",
    });
  }
  res.json(val);
});




        ///////STATE////////



app.get("/fetch", function (req, res) {
  // fetchid = req.params.ID;
  newmodel.find({}, function (err, val) {
    res.send(val);
  });
});

app.post("/COUNTRY/:COUNTRY", (req, res) => {
  let PUTCOUNTRY = req.params.COUNTRY;
  let PUTSTATE = req.body.STATENAME;
  newmodel.findOneAndUpdate(
    { COUNTRY: PUTCOUNTRY },
    { $push: { STATE: { STATENAME: PUTSTATE } } },
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        if (data == null) {
          res.send({
            status: false,
            message: "Nothing found",
          });
        } else {
          res.send({
            status: true,
            message: "Data Updated successfully",
          });
        }
      }
      data.save();
    }
  );
});


        ///////DISTRICT//////


app.get("/COUNTRY/:COUNTRY", (req, res, next) => {
  const id = req.params.COUNTRY;
  newmodel.find({ COUNTRY: id } )
    .populate("COUNTRY")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

app.post("/COUNTRY/:COUNTRY/:STATENAME", (req, res) => {
  let PUTCOUNTRY = req.params.COUNTRY;
  let PUTSTATE = req.params.STATENAME;
  let PUTDISTRICT = req.body.DISTRICTNAME;
  newmodel.findOneAndUpdate(
    {$and: [ { 'COUNTRY': PUTCOUNTRY  },{'STATE': {'$elemMatch':{'STATENAME':PUTSTATE}} }]},
    // {$push:{"state":{"district":{ districtname: updateddistrict } }}},{new: true},(err,data) => {
    { $push: { "STATE.$[outer].DISTRICT": { DISTRICTNAME : PUTDISTRICT } } },
    { "arrayFilters": [{ "outer.STATENAME": PUTSTATE }] },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        if (data == null) {
          res.send({
            status: false,
            message: "Nothing found",
          });
        } else {
          res.send({
            status: true,
            message: "Data Updated successfully",
          });
        }
      }
      // data.save();
    }
  );
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
