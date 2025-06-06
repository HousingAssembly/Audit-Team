const Audit = require("../models/audit");

exports.getStats = async (req, res) => {
  try {
    const genderStats = await Audit.aggregate([
    {
      $group: {
        _id: "$applicant.gender",  // directly use the stored gender field
        count: { $sum: 1 }
      }
    },
      {
        $project: {
          _id: 0,
          gender: "$_id",
          count: 1
        }
      }
    ]);

    let maleCount = 0;
    let femaleCount = 0;
    genderStats.forEach((entry) => {
      if (entry.gender === "Male") maleCount = entry.count;
      else if (entry.gender === "Female") femaleCount = entry.count;
    });

    const rawAgeGroups = await Audit.aggregate([
      {
        $match: {
          "applicant.date_of_birth": { $exists: true, $ne: null, $ne: "" }
        }
      },
      {
        $addFields: {

          applicantAge: {
            $let: {
              vars: {
                msSinceBirth: {
                  $subtract: [
                    "$$NOW",
                    {
                      $dateFromString: {
                        dateString: "$applicant.date_of_birth",
                        format: "%Y-%m-%d",
                        onError: null,
                        onNull: null
                      }
                    }
                  ]
                }
              },
              in: {
                $cond: [
                  { $eq: ["$$msSinceBirth", null] },
                  null,
                  { $divide: ["$$msSinceBirth", 31536000000] }
                ]
              }
            }
          }
        }
      },
      {
        $bucket: {
          groupBy: "$applicantAge",
          boundaries: [0, 30, 45, 60, 120],
          default: "Unknown",
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    const ageGroups = rawAgeGroups.reduce((acc, group) => {
      let label;
      if (group._id === 0) label = "0-30";
      else if (group._id === 30) label = "31-45";
      else if (group._id === 45) label = "46-60";
      else if (group._id === 60) label = "60+";
      else label = "60+";
      acc[label] = group.count;
      return acc;
    }, {});

    const rawWaitingTimes = await Audit.aggregate([
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
                        format: "%Y-%m-%d",
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
        $bucket: {
          groupBy: "$waitingTime",
          boundaries: [0, 5, 10, 100],
          default: "Unknown",
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    const waitingTimes = rawWaitingTimes.reduce((acc, group) => {
      let label;
      if (group._id === 0) label = "0-5";
      else if (group._id === 5) label = "5-10";
      else if (group._id === 10) label = "10+";
      else label = "10+";
      acc[label] = group.count;
      return acc;
    }, {});

    const regionalDistribution = await Audit.aggregate([
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
          totalPeopleInRegion: 1
        }
      }
    ]);

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
                        format: "%Y-%m-%d",
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
        $group: {
          _id: null,
          totalWaitingPeople: { $sum: 1 },
          averageWaitingTime: { $avg: "$waitingTime" }
        }
      }
    ]);

    const totalWaitingPeople =
      waitingListStats.length > 0
        ? waitingListStats[0].totalWaitingPeople
        : 0;
    const averageWaitingTime =
      waitingListStats.length > 0
        ? waitingListStats[0].averageWaitingTime
        : 0;

    const finalStats = {
      totalUsers: maleCount + femaleCount,
      maleCount,
      femaleCount,
      ageGroups,
      waitingTimes,
      regionalDistribution,
      totalWaitingPeople,
      averageWaitingTime
    };

    return res.json(finalStats);
  } catch (err) {
    console.error("getStats error:", err);
    return res.status(500).json({ message: err.message });
  }
};
