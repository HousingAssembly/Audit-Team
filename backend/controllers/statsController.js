const Audit = require("../models/audit");
const moment = require("moment"); 

const calculateAge = (dob) => {
  const birthDate = moment(dob, "YYYY-MM-DD");
  return moment().diff(birthDate, "years");
};

const calculateWaitingTime = (applicationDate) => {
  const appDate = moment(applicationDate, "YYYY-MM-DD");
  return moment().diff(appDate, "years");
};

exports.getStats = async (req, res) => {
  try {
    const audits = await Audit.find(); 
    
    let totalUsers = audits.length;
    let maleCount = 0;
    let femaleCount = 0;
    let ageGroups = { "18-30": 0, "31-45": 0, "46-60": 0, "60+": 0 };
    let waitingTimes = { "0-5": 0, "5-10": 0, "10+": 0 };

    audits.forEach((audit) => {
      if (audit.applicant.surname && audit.spouse_or_partner.surname) {
        maleCount += 1; 
      } else {
        femaleCount += 1;
      }

      const applicantAge = calculateAge(audit.applicant.date_of_birth);
      if (applicantAge <= 30) ageGroups["18-30"] += 1;
      else if (applicantAge <= 45) ageGroups["31-45"] += 1;
      else if (applicantAge <= 60) ageGroups["46-60"] += 1;
      else ageGroups["60+"] += 1;

      const waitingTime = calculateWaitingTime(audit.application_date);
      if (waitingTime <= 5) waitingTimes["0-5"] += 1;
      else if (waitingTime <= 10) waitingTimes["5-10"] += 1;
      else waitingTimes["10+"] += 1;
    });

    const stats = {
      totalUsers,
      maleCount,
      femaleCount,
      ageGroups,
      waitingTimes
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
