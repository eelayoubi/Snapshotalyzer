const program = require('./commander');
const { listAllEC2Snapshots } = require('./ec2-services');

const snapshots = program.command('snapshots');

snapshots
    .command('list')
    .description('list EC2 snapshots')
    .action(async () => {
        await listAllEC2Snapshots();
    });