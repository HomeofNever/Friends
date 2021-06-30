const yaml = require("js-yaml");
const consola = require("consola");
const { readFileSync } = require("fs");
const path = require("path");

// Get document, or throw exception on error
// Exit on 1 to stop CI
consola.info("Start reading yaml");
try {
  friends = yaml.safeLoad(
    readFileSync(path.resolve(__dirname, "src/friends.yml"), "utf8")
  );
  consola.info("object read: ", friends);
} catch (e) {
  consola.error(e);
  process.exit(1);
}

module.exports = friends