const yaml = require("js-yaml");
const consola = require("consola");
const got = require("got");
const { readFileSync, writeFileSync, existsSync } = require("fs");
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


// Get document, or throw exception on error
// Exit on 1 to stop CI
let friends = {};
consola.info('Start reading yaml')
try {
  friends = yaml.safeLoad(
    readFileSync(path.resolve(__dirname, "src/friends.yml"), "utf8")
  );
  consola.info("object read: ", friends);
} catch (e) {
  consola.error(e);
  process.exit(1);
}

// Test img
consola.info('Start testing img')
try {
  Object.keys(friends).forEach((e) => {
    if (
      !(
        friends[e].img === null ||
        testUrl(friends[e].img) ||
        testFileExist(friends[e].img)
      )
    )
      throw new Error(friends[e].img + " is invaild");
  });
  consola.success("nice, everyone has a valid img!");
} catch (e) {
  consola.error(e);
  process.exit(1);
}

// Test blog's connectivity
consola.info('Start testing blog connectivity')
const responses = Object.keys(friends)
  .filter((e) => friends[e].test !== false)
  .map((e) => {
    return got(friends[e].link, {
        timeout: 15000
    }).then((res) => {
      return {
        link: friends[e].link,
        response: res.body.substring(0, 50),
      };
    }).catch(err => {
        consola.error(err)
        throw new Error(`${friends[e].link} failed the request`)
    });
  });

// Write file on all success
Promise.all(responses)
  .then((values) => {
    consola.info(values)
    consola.success("nice, everyone looks healthy");
    consola.info("Start writing json")
    writeFileSync(
      path.resolve(__dirname, "public/friends.json"),
      JSON.stringify(friends)
    );
    console.success("Finished writing json")
  })
  .catch((e) => {
    consola.error(e);
    process.exit(1);
  });
