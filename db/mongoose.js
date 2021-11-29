require('dotenv/config');
const express = require("express");
const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Database connected');
  })
  .catch(e => {
    console.log(e);
  });
