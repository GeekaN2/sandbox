

const pg = require("pg");
const { program } = require('commander');
program
  .option('-u, --user <string>')
  .option('-p, --password <string>');

program.parse();

const options = program.opts();

const { user, password } = options;

const client = new pg.Client("postgres://geekan:[REDACTED]@rc1b-kgi76p18jd7z1qol.mdb.yandexcloud.net:6432/db1?ssl=true");
client.connect();

// // "u1' UNION SELECT null,null,count"
// // "SELECT users.user_id,users.nickname,users.password from users where user_id='' and password=''"

client.query(`SELECT users.user_id,users.nickname,users.password from users where user_id='$1::text' and password='$2::text'`, [user, password], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  client.end()
})


console.log(user, password);
