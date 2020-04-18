
function commaSeparatedList(value) {
    return value.split(',');
}

function prepareFilterParam(value) {
    if (!value) return;
    return {
        Filters: [
            {
                Name: 'tag:Project',
                Values: [
                    value
                ]
            }
        ]
    }
};

function getEC2VolumesIds(ec2_instances = []) {
    const volume_ids = ec2_instances.map(instance => {
        return instance.BlockDeviceMappings.map(volume => {
            return volume.Ebs.VolumeId;
        });
    });
    return volume_ids.flat();
}

function filterVolumeFields(volumes = []) {
    return volumes.map(volume => {
        return {
            VolumeId: volume.VolumeId,
            State: volume.State,
            SnapshotId: volume.SnapshotId,
            Size: volume.Size,
            Encrypted: volume.Encrypted,
            CreateTime: volume.CreateTime,
            AvailabilityZone: volume.AvailabilityZone,
        };
    })
}

function filterSnapshotFields(snapshots = []) {
    return snapshots.map(s => {
        return {
            SnapshotId: s.SnapshotId,
            StartTime: s.StartTime,
            State: s.State,
            VolumeId: s.VolumeId,
            VolumeSize: s.VolumeSize,
        };
    });
}

function filterEC2Fields(ec2_instances = []) {
    return ec2_instances.map(instance => {
        return {
            ImageId: instance.ImageId,
            InstanceId: instance.InstanceId,
            InstanceType: instance.InstanceType,
            LaunchTime: instance.LaunchTime,
            State: instance.State.Name
        }
    })
}

module.exports = {
    commaSeparatedList,
    prepareFilterParam,
    getEC2VolumesIds,
    filterVolumeFields,
    filterSnapshotFields,
    filterEC2Fields
}