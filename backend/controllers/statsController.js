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
            $let: {
              vars: {
                parsedDate: {
                  $dateFromString: {
                    dateString: "$applicant.date_of_birth",
                    format: "%Y/%m/%d",
                    onError: null,
                    onNull: null
                  }
                }
              },
              in: {
                $cond: [
                  { $eq: ["$$parsedDate", null] },
                  null,
                  { $divide: [{ $subtract: [new Date(), "$$parsedDate"] }, 31536000000] }
                ]
              }
            }
          }
        }
      },
      {
        $match: { applicantAge: { $ne: null } }
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

      // Only add to ageGroups if it's a valid label (not Unknown)
      if (label && ageGroups.hasOwnProperty(label)) {
        ageGroups[label] = group.count;
      }
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
            $let: {
              vars: {
                parsedDate: {
                  $dateFromString: {
                    dateString: "$application_date",
                    format: "%Y/%m/%d",
                    onError: null,
                    onNull: null
                  }
                }
              },
              in: {
                $cond: [
                  { $eq: ["$$parsedDate", null] },
                  null,
                  { $divide: [{ $subtract: [new Date(), "$$parsedDate"] }, 31536000000] }
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
      }

      // Only add to waitingTimes if it's a valid label (not Unknown)
      if (label && waitingTimes.hasOwnProperty(label)) {
        waitingTimes[label] = group.count;
      }
    }); 

    // ─── 5) REGIONAL DISTRIBUTION ───────────────────────────────────────────────
    const rawRegional = await Audit.aggregate([
      {
        $match: {
          "address.suburb": { $exists: true, $ne: null, $ne: "" }
        }
      },
      {
        $group: {
          _id: { $toUpper: "$address.suburb" }, // Normalize to uppercase
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

    // Build an array of regions with their data, then sort by number of people
    const regionsArray = rawRegional
      .filter((doc) => doc.region && doc.region !== "") // Filter out null/empty regions
      .map((doc) => {
        const people = doc.count;
        const percent = totalUsers > 0
          ? Number(((people / totalUsers) * 100).toFixed(2))
          : 0;
        return {
          name: doc.region,
          people,
          percent
        };
      })
      .sort((a, b) => b.people - a.people); // Sort by number of people descending

    // Convert back to object format for backwards compatibility
    const regions = {};
    regionsArray.forEach((region) => {
      regions[region.name] = { people: region.people, percent: region.percent };
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
      regionsArray, // Include sorted array for guaranteed order
      totalWaitingPeople,
      averageWaitingTime
    };

    console.log(`Stats: ${totalUsers} users, ${Object.keys(regions).length} regions, ${regionsArray.length} unique suburbs`);
    return res.json(finalStats);
  } catch (err) {
    console.error("getStats error:", err);
    return res.status(500).json({ message: err.message });
  }
};
