const friends = require('./yaml');
const got = require("got");
const consola = require("consola");

const { RateLimit } = require('async-sema');
const lim = RateLimit(3, { timeUnit: '3000', uniformDistribution: true })

const testConnectivity = async () => {
    for (const e of Object.keys(friends).filter((e) => friends[e].test !== false)) {
        await lim()
        await got(friends[e].link, {
            timeout: 15000,
            headers: {
                "User-Agent": "Github Action Connectivity test for friend link. Details: https://github.com/HomeofNever/Friends"
            }
        })
            .then((res) => {
                consola.info({
                    link: friends[e].link,
                    response: res.body.substring(0, 50),
                })
            })
            .catch((err) => {
                consola.error(err);
                throw new Error(`${friends[e].link} failed the request`);
            });
    }
}

// Test blog's connectivity
consola.info("Start testing blog connectivity");
testConnectivity().catch(e => process.exit(1))
