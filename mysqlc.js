#!/usr/bin/env node
/*
 * This is a simple example for connecting to MySQL databases and execute queries via CLI.
 * Author: agribu 
 * License: GNU GPLv3
 */

const argv = require('yargs').argv;
const mysql = require('mysql');
const fs = require("fs");

// read config file
var config = JSON.parse(fs.readFileSync("config.json"));

// CLI parameter handling
if (argv.usage) {
    printInfo();
} else if (check_query = typeof argv.query === 'string' || argv.query instanceof String) {
    // start new connection
    var con = mysql.createConnection({
        host: config.host,
        port: config.port,   
        user: config.user,
        password: config.password,
	database: config.database
    });
    con.connect();

    con.query(argv.query, function (err, result, fields) {
        if (err) throw err;
        if (argv.json) {
            // print as JSON format
	        var res = JSON.stringify(result, null, 4);
            console.log(res);
        } else {
            // print normal
            console.log(result);
        }
    });

    // terminate database connection
    con.end();
} else {
    console.error('\x1b[31m%s\x1b[0m',"\nError: Please provide a query using the parameter --query=\"some query\"!");
}

// show additional information
function printInfo() {
    console.log('\x1b[33m%s\x1b[0m', "Execute: node db_connect [OPTIONS]");
    console.log("\t--query\t\t[String]\tMySQL query");
    console.log("\t--json\t\t\t\tOutput as JSON format");
    console.log("\t--usage\t\t\t\tPrint this information");
}
