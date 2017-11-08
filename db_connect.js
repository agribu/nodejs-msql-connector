#!/usr/bin/env node
/*
 * This is a simple example for connecting to MySQL databases and execute queries via CLI.
 * Author: agribu 
 * License: GNU GPLv3
 */

const argv = require('yargs').argv;
const mysql = require('mysql');
const fs = require("fs");

var config = JSON.parse(fs.readFileSync("config.json"));

if (argv.usage) {
    printInfo();
} else if (check_query = typeof argv.query === 'string' || argv.query instanceof String) {
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
        console.log(result);
    });

    con.end();
} else {
    console.error('\x1b[31m%s\x1b[0m',"\nError: Please provide a query using the parameter --query=\"some query\"!");
}

function printInfo() {
    console.log('\x1b[33m%s\x1b[0m', "Execute: node db_connect [OPTIONS] ... > [FILE]");
    console.log("\t--query\t\t[String]\tMySQL query");
    console.log("\t--usage\t\t\t\tPrint this information");
}
