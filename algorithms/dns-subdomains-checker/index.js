const { exec } = require('child_process');
const PromisePool = require('es6-promise-pool')

const fs = require('fs');

const domains = fs.readFileSync('./words_alpha.txt', { encoding: 'utf8', flag: 'r' }).split('\n');
const words = fs.readFileSync('./words.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

const allDomains = [...new Set([...domains, ...words])];
const isValidSubdomain = (answer) => {
    return /\;\; ANSWER SECTION\:/.test(answer);
}

const availableSubdomains = [];
let filteredDomains = allDomains.filter(subdomain => subdomain.length <= 7);
filteredDomains = filteredDomains; //.slice(filteredDomains.indexOf('corno'));
console.log('FILTERED DOMAINS', filteredDomains);

let counter = 0;

function runShellCommand() {
    this.execCommand = function (cmd, domain) {
        return new Promise((resolve, reject) => {
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    resolve({
                        stdout: 'shiet',
                        domain: domain,
                    });
                    return;
                }
                resolve({
                    stdout: stdout,
                    domain: domain
                })
            });
        })
    }
}

const os = new runShellCommand();


function
    sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const promisesGenerator = function *() {
    for (let i = 0; i < filteredDomains.length; i++) {
        yield os.execCommand(`dig +time=10 10.10.10.10 -p 49971 ${filteredDomains[i]}.hosting.osint`, filteredDomains[i]);
    }
}

const pool = new PromisePool(promisesGenerator, 50);

console.log('POOL', pool);

pool.start().then(response => {
    console.log('RESPONSE', response);
    console.log("ALL DOMAIND", availableSubdomains, counter);
});

pool.addEventListener('fulfilled', function (event) {
    const { stdout, domain } = event.data.result;

    if (stdout === 'shiet') {
        filteredDomains.push(domain);
        console.log('shiet', domain);
    }
    if (isValidSubdomain(stdout)) {
        console.log('nice', ++counter, domain);
        availableSubdomains.push(domain);
    }
})


pool.addEventListener('rejected', function (event) {
    console.log('Rejected: ' + event.data.error.message)
});
