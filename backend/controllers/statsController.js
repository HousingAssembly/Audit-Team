// controllers/statsController.js

const Audit = require("../models/audit");

exports.getStats = async (req, res) => {
  try {
    // ─── 1) TOTAL USERS ─────────────────────────────────────────────────────────
    const totalUsers = await Audit.countDocuments();

    // ─── 2) GENDER STATS ────────────────────────────────────────────────────────
    const genderStats = await Audit.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $eq: ["$applicant.gender", "male"] },   then: "Male"   },
                { case: { $eq: ["$applicant.gender", "female"] }, then: "Female" }
              ],
              default: "Unknown"
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: { _id: 0, gender: "$_id", count: 1 }
      }
    ]);

    let maleCount = 0;
    let femaleCount = 0;
    genderStats.forEach((entry) => {
      if (entry.gender === "Male")   maleCount = entry.count;
      else if (entry.gender === "Female") femaleCount = entry.count;
      // entries with gender === "Unknown" are ignored for male/female totals
    });

    // ─── 3) AGE GROUPS ───────────────────────────────────────────────────────────
    const rawAgeGroups = await Audit.aggregate([
      {
        $match: {
          "applicant.date_of_birth": { $exists: true, $ne: null, $ne: "" }
        }
      },
      {
        $addFields: {
          applicantAge: {
            $divide: [
              { $subtract: [new Date(), { $toDate: "$applicant.date_of_birth" }] },
              31536000000
            ]
          }
        }
      },
      {
        $bucket: {
          groupBy: "$applicantAge",
          boundaries: [0, 30, 45, 60, 140],
          default: "Unknown",
          output: { count: { $sum: 1 } }
        }
      }
    ]);
    // Initialize all age groups to zero
    const ageGroups = {
      "0-30": 0,
      "31-45": 0,
      "46-60": 0,
      "60+": 0
    };

    rawAgeGroups.forEach((group) => {
      let label;
      if (group._id === 0)
        label = "0-30";
      else if (group._id === 30 )
        label = "31-45";
      else if (group._id === 45)
        label = "46-60";
      else if (group._id === 60)
        label = "60+";
      else
        label = "Unknown";
      ageGroups[label] = label === "Unknown" ? "Unknown" : group.count;
    });

    // ─── 4) WAITING TIME BUCKETS ────────────────────────────────────────────────
    const rawWaitingTimes = await Audit.aggregate([
      {
        $match: {
          application_date: { $exists: true, $ne: null, $ne: "" }
        }
      },
      {
        $addFields: {
          waitingTime: {
            $divide: [
              { $subtract: [new Date(), { $toDate: "$application_date" }] },
              31536000000  
            ]
          }
        }
      },
      {
        $bucket: {
          groupBy: "$waitingTime",
          boundaries: [0, 5, 10, 140],
          default: "Unknown",
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    // Initialize all waiting-time groups to zero
    const waitingTimes = {
      "0-5": 0,
      "5-10": 0,
      "10+": 0
    };

    rawWaitingTimes.forEach((group) => {
      let label;
      if (group._id === 0) {
        label = "0-5";
      } else if (group._id === 5) {
        label = "5-10";
      } else if (group._id === 10) {
        label = "10+";
      } else {
        label = "Unknown";
      }
      waitingTimes[label] = group.count;
    }); 

    // ─── 5) REGIONAL DISTRIBUTION ───────────────────────────────────────────────
    const rawRegional = await Audit.aggregate([
      {
        $group: {
          _id: "$address.suburb",
          totalPeopleInRegion: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          count: "$totalPeopleInRegion"
        }
      }
    ]);

    // Build an object { regionName: { people, percent } }
    const regions = {};
    rawRegional.forEach((doc) => {
      const people = doc.count;
      const percent = totalUsers > 0
        ? Number(((people / totalUsers) * 100).toFixed(2))
        : 0;
      regions[doc.region] = { people, percent };
    });

    // ─── 6) WAITING-LIST TOTAL & AVERAGE ──────────────────────────────────────── 
    const waitingListStats = await Audit.aggregate([
      {
        $match: {
          application_date: { $exists: true, $ne: null, $ne: "" }
        }
      },
      {
        $addFields: {
          waitingTime: {
            $let: {
              vars: {
                msWaiting: {
                  $subtract: [
                    "$$NOW",
                    {
                      $dateFromString: {
                        dateString: "$application_date",
                        format: "%Y/%m/%d",
                        onError: null,
                        onNull: null
                      }
                    }
                  ]
                }
              },
              in: {
                $cond: [
                  { $eq: ["$$msWaiting", null] },
                  null,
                  { $divide: ["$$msWaiting", 31536000000] }
                ]
              }
            }
          }
        }
      },
      {
        $match: { waitingTime: { $ne: null } }
      },
      {
        $group: {
          _id: null,
          totalWaitingPeople: { $sum: 1 },
          totalWaitingTime: { $sum: "$waitingTime" }
        }
      }
    ]);

    const totalWaitingPeople = 
      waitingListStats.length > 0 ? waitingListStats[0].totalWaitingPeople : 0;
    const totalWaitingTime = 
      waitingListStats.length > 0 ? waitingListStats[0].totalWaitingTime : 0;

    const averageWaitingTime = 
      totalWaitingPeople > 0 ? totalWaitingTime / totalWaitingPeople : 0;

    // ─── 7) FINAL RESPONSE ─────────────────────────────────────────────────────
    const finalStats = {
      totalUsers,
      maleCount,
      femaleCount,
      ageGroups,
      waitingTimes,
      regions,
      totalWaitingPeople,
      averageWaitingTime
    };

    return res.json(finalStats);
  } catch (err) {
    console.error("getStats error:", err);
    return res.status(500).json({ message: err.message });
  }
};
