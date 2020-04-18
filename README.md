# snapshotalyzer-30000
Demo project to manage AWS EC2 instance snapshots

# About
This project is a demo, and uses aws-sdk to manage AWS EC2 instance snapshots.

# Configuring
this app uses configuration file created by the AWS cli. (the default profile) e.g.

to switch profiles, please check: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html


# Running
Make sure you have node running on your machine
```
node -v
v10.13.0
```
if not, please refer to: https://nodejs.org/en/download/

Once you are in the root of the application (same level as the package.json), run:
```
npm install
```
This will install all the needed packages.

To run the script:
```
node index.js 
```
Result:
```
Usage: index [options] [command]

EC2 Manage resources

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  instances
  volumes
  snapshots
  help [command]  display help for command

```
Example:

```
node index.js volumes list  
List of volumes: 
┌─────────┬─────────────────────────┬─────────────┬────────────┬──────┬───────────┬──────────────────────────┬──────────────────┐
│ (index) │        VolumeId         │    State    │ SnapshotId │ Size │ Encrypted │        CreateTime        │ AvailabilityZone │
├─────────┼─────────────────────────┼─────────────┼────────────┼──────┼───────────┼──────────────────────────┼──────────────────┤
│    0    │ 'vol-05486f44768ea7206' │ 'available' │     ''     │  8   │   false   │ 2020-04-18T19:03:39.957Z │   'eu-west-3a'   │
└─────────┴─────────────────────────┴─────────────┴────────────┴──────┴───────────┴──────────────────────────┴──────────────────┘
```

```
node index.js volumes list --attached
┌─────────┐
│ (index) │
├─────────┤
└─────────┘
```
Here we have an empty table, since the state of the volume (check the previous table) is available, meaning it is not attached.

# Note
Feel free to improve this, and to add the snapshot scenarios (I will try to do it in the future ;))
