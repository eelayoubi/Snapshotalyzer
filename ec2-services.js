const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-3' });
const ec2 = new AWS.EC2();
const { getEC2VolumesIds, filterVolumeFields, filterSnapshotFields
    , filterEC2Fields } = require('./helpers');

async function listAllEC2Instances(filterParams) {
    try {
        const result = await ec2.describeInstances(filterParams).promise();
        const ec2_instances = result && result.Reservations[0] && result.Reservations[0].Instances || [];
        const filteredEC2 = filterEC2Fields(ec2_instances);
        console.log('List of EC2 instances: ');
        console.table(filteredEC2);
    } catch (error) {
        console.log('something went wrong ... ', error);
    }

}

async function stopEC2Instances(ids) {
    if (!ids) throw ('please provide the list of instance ids to stop');
    try {
        const result = await ec2.stopInstances({ InstanceIds: ids }).promise();
        console.log('stopping the following instances: ', result)
    } catch (error) {
        console.log('something went wrong ... ', error);
    }
}

async function startEC2Instances(ids) {
    if (!ids) throw ('please provide the list of instance ids to start');
    try {
        const result = await ec2.startInstances({ InstanceIds: ids }).promise();
        console.log('starting the following instances: ', result)
    } catch (error) {
        console.log('something went wrong ... ', error);
    }
}

async function listAllEC2Volumes() {
    try {
        const volumes = await ec2.describeVolumes().promise();
        const filteredVolumes = filterVolumeFields(volumes.Volumes);
        console.log('List of volumes: ');
        console.table(filteredVolumes);
    } catch (error) {
        console.log('something went wrong ... ', error);
    }
}

async function listAllEC2AttachedVolumes() {
    try {
        const result = await ec2.describeInstances().promise();
        const ec2_instances = result && result.Reservations[0] && result.Reservations[0].Instances;
        const volume_ids = getEC2VolumesIds(ec2_instances);
        if (!volume_ids.length) {
            console.table([]);
            return;
        }
        const volumes = await ec2.describeVolumes({ VolumeIds: volume_ids }).promise();
        const filteredVolumes = filterVolumeFields(volumes.Volumes);
        console.log('List of volumes: ');
        console.table(filteredVolumes);
    } catch (error) {
        console.log('something went wrong ... ', error);
    }
}

// to complete
async function listAllEC2Snapshots() {
    try {
        console.table([])
    } catch (error) {
        console.log('something went wrong ... ', error);
    }
}


module.exports = {
    listAllEC2Instances,
    stopEC2Instances,
    startEC2Instances,
    listAllEC2Volumes,
    listAllEC2AttachedVolumes,
    listAllEC2Snapshots
}