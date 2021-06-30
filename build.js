const friends = require('./yaml');
const consola = require("consola");
const { writeFileSync, existsSync } = require("fs");
const path = require("path");
const testUrl = (str) => {
  try {
    new URL(str).href;
  } catch (e) {
    return false;
  }
  return true;
};
const testFileExist = (str) =>
  existsSync(path.resolve(__dirname, "src/friends", str));

const imgPrefix = 'https://cdn.jsdelivr.net/gh/homeofnever/friends@gh-pages/friends/'

// Test img
consola.info("Start testing img");
try {
  Object.keys(friends).forEach((e) => {
    if (!(friends[e].img === null || testUrl(friends[e].img))) {
        if (testFileExist(friends[e].img)) {
            friends[e].img = imgPrefix + friends[e].img
        } else {
            throw new Error(friends[e].img + " is invaild");
        }
    }
  });
  consola.success("nice, everyone has a valid img!");
  consola.info(friends)
} catch (e) {
  consola.error(e);
  process.exit(1);
}

consola.info("Start writing json");
writeFileSync(
  path.resolve(__dirname, "public/friends.json"),
  JSON.stringify(friends)
);
consola.success("Finished writing json");
