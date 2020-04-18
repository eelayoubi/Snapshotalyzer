const program = require('./commander');
const { listAllEC2Volumes, listAllEC2AttachedVolumes } = require('./ec2-services');

const volumes = program.command('volumes');

volumes
    .command('list')
    .description('list EC2 volumes')
    .option('--attached', 'List EC2 volumes that are attached to an EC2 instance')
    .action(async (arg) => {
        const opts = arg.opts();
        if (opts.attached) {
            await listAllEC2AttachedVolumes();
            return;
        }
        await listAllEC2Volumes();
    });