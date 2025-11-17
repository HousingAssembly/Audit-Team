// Script to check all audits in database
require("dotenv").config();
const mongoose = require("mongoose");
const Audit = require("./models/audit");

const checkAudits = async () => {
  try {
    console.log("🔌 Connecting to database...");
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "housing_audit",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to database (housing_audit)\n");

    // Get total count
    const totalCount = await Audit.countDocuments();
    console.log(`📊 Total audits in database: ${totalCount}\n`);

    if (totalCount > 0) {
      // Get all audits
      const audits = await Audit.find({}).limit(10);

      console.log("📋 Sample audits (first 10):\n");
      audits.forEach((audit, i) => {
        console.log(`${i + 1}. Registration: ${audit.registration_number}`);
        console.log(`   Suburb: "${audit.address?.suburb || 'N/A'}"`);
        console.log(`   Name: ${audit.applicant?.first_name} ${audit.applicant?.surname}`);
        console.log();
      });

      // Get all unique suburbs (including null/empty)
      const allAudits = await Audit.find({});
      const suburbMap = {};

      allAudits.forEach(audit => {
        const suburb = audit.address?.suburb;
        if (suburb && suburb.trim() !== "") {
          if (!suburbMap[suburb]) {
            suburbMap[suburb] = 0;
          }
          suburbMap[suburb]++;
        }
      });

      console.log("\n📊 All suburbs in database:\n");
      console.log("Suburb Name                Count");
      console.log("─────────────────────────  ─────");

      Object.entries(suburbMap)
        .sort((a, b) => b[1] - a[1]) // Sort by count descending
        .forEach(([suburb, count]) => {
          console.log(`${suburb.padEnd(25)}  ${count}`);
        });

      console.log(`\n📈 Total unique suburbs: ${Object.keys(suburbMap).length}`);

      // Find case duplicates
      const normalized = {};
      Object.keys(suburbMap).forEach(suburb => {
        const upper = suburb.toUpperCase();
        if (!normalized[upper]) {
          normalized[upper] = [];
        }
        normalized[upper].push(suburb);
      });

      const duplicates = Object.entries(normalized).filter(([_, variations]) => variations.length > 1);

      if (duplicates.length > 0) {
        console.log("\n⚠️  Case-sensitivity duplicates found:\n");
        duplicates.forEach(([normalized, variations]) => {
          const total = variations.reduce((sum, v) => sum + suburbMap[v], 0);
          console.log(`  "${normalized}" (Total: ${total} audits) has ${variations.length} variations:`);
          variations.forEach(v => {
            console.log(`    - "${v}" → ${suburbMap[v]} audit${suburbMap[v] > 1 ? 's' : ''}`);
          });
          console.log();
        });
      }
    }

    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

checkAudits();
