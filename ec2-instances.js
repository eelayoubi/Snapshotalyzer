
const program = require('./commander');
const { commaSeparatedList, prepareFilterParam } = require('./helpers');
const { listAllEC2Instances, startEC2Instances, stopEC2Instances } = require('./ec2-services');


const instances = program.command('instances');

instances
    .command('list')
    .description('list EC2 instances')
    .option('--project <value>', 'filter by tag: Project')
    .action(async (arg) => {
        const opts = arg.opts();
        console.log(arg.opts())
        await listAllEC2Instances(prepareFilterParam(opts.project));
    });


instances
    .command('stop')
    .description('Stop EC2 instances')
    .requiredOption('--ids <value>', 'comma separated list of ids', commaSeparatedList)
    .action(async (arg) => {
        const opts = arg.opts();
        const ids = opts && opts.ids;
        console.log(ids)
        await stopEC2Instances(ids);
    });

instances
    .command('start')
    .description('Start EC2 instances')
    .requiredOption('--ids <value>', 'comma separated list of ids', commaSeparatedList)
    .action(async (arg) => {
        const opts = arg.opts();
        const ids = opts && opts.ids;
        console.log(ids)
        try {
            await startEC2Instances(ids);
        } catch (error) {
            console.error(error);
        }
    });
