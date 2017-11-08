# nodejs-msql-connector
This is a simple example for connecting to MySQL databases and execute queries via CLI.

To get started, adjust the parameters in `config.json`. 
Then build the project by running:
```bash
npm install
```
Examples:
```bash
# Run this for displaying additional information
nodejs mysqlc.js --usage
# A simple MySQL query
nodejs mysqlc.js --query="select * from Persons;"
# Save results as json file
nodejs mysqlc.js --query="select * from Persons;" --json > myfile.json
```
Extended Examples:
```bash
# Retrieve all tables of the configured database as JSON format
nodejs mysqlc_ext.js --getTables
# Retrieve all columns of a certain table as JSON format
nodejs mysqlc_ext.js --getCols='db_table'
```

License: GNU GPLv3
