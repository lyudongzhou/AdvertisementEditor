let exec = require('child_process').execSync;
// 项目名称放入env中
process.env.Project = process.argv[2];
exec('vue-cli-service serve --mode development', {stdio: 'inherit'});