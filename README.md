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
nodejs db_connect.js --usage
# A simple MySQL query
nodejs db_connect.js --query="select * from Persons;"
# For saving query results as json files
nodejs db_connect.js --query="select * from Persons;" > myfile.json
```

License: GNU GPLv3
