// Script to check existing suburbs in database
require("dotenv").config();
const mongoose = require("mongoose");
const Audit = require("./models/audit");

const checkSuburbs = async () => {
  try {
    console.log("🔌 Connecting to database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to database\n");

    // Get all unique suburbs (case-sensitive)
    const audits = await Audit.find({ "address.suburb": { $exists: true, $ne: null, $ne: "" } });

    // Group suburbs by their actual string value
    const suburbMap = {};
    audits.forEach(audit => {
      const suburb = audit.address.suburb;
      if (!suburbMap[suburb]) {
        suburbMap[suburb] = 0;
      }
      suburbMap[suburb]++;
    });

    console.log("📊 Current suburbs in database:\n");
    console.log("Suburb Name                Count");
    console.log("─────────────────────────  ─────");

    Object.entries(suburbMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([suburb, count]) => {
        console.log(`${suburb.padEnd(25)}  ${count}`);
      });

    console.log(`\n📈 Total unique suburb variations: ${Object.keys(suburbMap).length}`);
    console.log(`📈 Total audits with suburbs: ${audits.length}\n`);

    // Find potential duplicates (same suburb, different case)
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
      console.log("⚠️  Found case-sensitivity duplicates:\n");
      duplicates.forEach(([normalized, variations]) => {
        console.log(`  "${normalized}" has ${variations.length} variations:`);
        variations.forEach(v => {
          console.log(`    - "${v}" (${suburbMap[v]} audit${suburbMap[v] > 1 ? 's' : ''})`);
        });
        console.log();
      });
    } else {
      console.log("✅ No case-sensitivity duplicates found!\n");
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

checkSuburbs();
