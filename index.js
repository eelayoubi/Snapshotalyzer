require('./flat');
const program = require('./commander');
require('./ec2-instances');
require('./ec2-volumes');
require('./ec2-snapshots');

program.parse(process.argv);