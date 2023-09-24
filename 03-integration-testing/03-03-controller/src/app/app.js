const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const { customerVerifier } = require('./verifier')
const { Person } = require('../Person');
const { CustomerVerificationResultStatus } = require("../CustomerVerificationResult");
const fraudMiddleware = require('./fraud')

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send('fraud server')
})

app.post("/fraudCheck", fraudMiddleware)

module.exports = app;
