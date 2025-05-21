// models/Receipt.js

const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema({
  registration_number: String,
  application_date: String,
  client_copy_date: String,
  applicant: {
    surname: String,
    first_name: String,
    id_number: String,
    date_of_birth: String
  },
  spouse_or_partner: {
    surname: String,
    first_name: String,
    id_number: String,
    date_of_birth: String
  },
  address: {
    street: String,
    suburb: String,
    postal_code: String
  },
  contact: {
    cellphone_1: String,
    cellphone_2: String,
    landline: String
  },
  marital_status: {
    status: String,
    date_married: String,
    date_divorced: String
  },
  ocr_raw_text: String,
  timestamp_uploaded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Receipt", ReceiptSchema);
