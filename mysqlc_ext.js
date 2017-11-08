#!/usr/bin/env node
/*
 * This is a simple example for connecting to MySQL databases and execute queries via CLI.
 * Author: agribu 
 * License: GNU GPLv3
 */
const argv = require('yargs').argv;
const mysql = require('mysql');
const fs = require("fs");
var con;

// Read configuration file
var config = JSON.parse(fs.readFileSync("config.json"));

// CLI parameter handling
if (typeof argv.query === 'string' || argv.query instanceof String) {
    // Execute query and optionally output results as json
	runQuery(argv.query, argv.json);
} else if (typeof argv.getCols === 'string' || argv.getcols instanceof String) {
    // Retrieve all columns of a certain database table
	getCols(argv.getCols);
} else if (argv.getTables) {
    // Retrieve all tables of the configured database
    getTables();
} else if (argv.usage) {
    // Show additional informaion if --usage parameter is used
    printInfo();
} else {
    console.error('\x1b[31m%s\x1b[0m',"Error: Please provide a query using the parameter --query=\"some query\"!");
    printInfo();
}

// Retrieve all tables from a database
function getTables() {
    var query = "show tables;";

    connect();

    con.query(query, function (err, result, fields) {
        if (err) throw err;
        // Retrieve all tables and return as json format
        console.log(
            JSON.stringify(
                result.map(function(keys) {
                    return Object.keys(keys).map(function(value){ 
                        return keys[value]; 
                    });
                }), 
            null, 4)
        );
    });

    terminate();
}


// Retrieve all columns from a database table
function getCols(table) {
    var query = "select * from " + table + ";";

    connect();

    con.query(query, function (err, result, fields) {
        if (err) throw err;
        // Retrieve all columns and return as json format
        console.log(
            JSON.stringify(
                result.map(function(keys) {
                    return Object.keys(keys);
                }), 
            null, 4)
        );
    });

    terminate();
}

// Execute queries on database
function runQuery(query, json) {
    connect();

    con.query(argv.query, function (err, result, fields) {
        if (err) throw err;
        if (argv.json) {
	        var res = JSON.stringify(result, null, 4);
            console.log(res);
        } else {
            console.log(result);
        }
    });

    terminate();
}

// Connect to database
function connect() {
    con = mysql.createConnection({
        host: config.host,
        port: config.port,   
        user: config.user,
        password: config.password,
	database: config.database
    });
    con.connect();
}

// End connection
function terminate() {
    con.end();
}

// Show aditional information
function printInfo() {
    console.log('\x1b[33m%s\x1b[0m', "Execute: nodejs db_connect [OPTIONS]");
    console.log("\t--query=\"mysql_query\"\tRun MySQL query and show output");
    console.log("\t--json\t\t\tOutput as JSON format, in combination with --query");
    console.log("\t--getTables\t\tGet database tables as JSON format");
    console.log("\t--getCols=\"db_table\"\tGet database table columns as JSON format");
    console.log("\t--usage\t\t\tPrint this information");
}
