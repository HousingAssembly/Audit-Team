const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema({
  registration_number: String,
  application_date: String,
  client_copy_date: String,
  applicant: {
    surname: String,
    first_name: String,
    id_number: String,
    date_of_birth: String,
    gender: String
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
    married_in_community: Boolean,
    married_out_of_community: Boolean,
    customary_marriage: Boolean,
    common_law_partner: Boolean,
    widowed: Boolean,
    divorced_with_dependants: Boolean,
    separated_with_dependants: Boolean,
    single_without_dependants: Boolean,
    engaged_to_be_married: Boolean,
    date_married: String,
    date_divorced: String
  },
  special_circumstances: {
    disability: Boolean,
    senior_citizen: Boolean,
    war_veteran: Boolean,
    pregnant: Boolean
  },
  timestamp_uploaded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Audit", AuditSchema);
