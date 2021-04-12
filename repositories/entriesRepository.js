const { Entries } = require("../models/index.js");

function createNewsEntry(data) {
  data.type = "news";
  return Entries.upsert(data);
}

module.exports.createNewsEntry = createNewsEntry;
