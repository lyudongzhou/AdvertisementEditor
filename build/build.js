// 项目名称放入env中
process.env.Project = process.argv[2];
let exec = require('child_process').execSync;
exec('vue-cli-service build', {stdio: 'inherit'});