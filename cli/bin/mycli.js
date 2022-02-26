process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const program = require('commander');
const axios = require('axios');
const chalk = require('chalk');

const base_url = 'http://localhost:8000'


export function cli(args) {


    program
        .command('healthcheck')
        .action(function (command) {
            axios.get(`${base_url}/admin/healthcheck/`)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    if (error.code == 'ECONNREFUSED')
                        console.log(chalk.red.bold.underline('Server is down!'))
                    else {
                        console.log(error)
                        // console.log(chalk.red.bold.underline('PASESOCST failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
                    }
                })
        })
    program
        .command('resetpasses')
        .action(function (command) {
            axios.get(`${base_url}/admin/resetpasses/`)
                .then(function (response) {
                    console.log(response.data.status);
                })
                .catch(function (error) {
                    if (error.code == 'ECONNREFUSED')
                        console.log(chalk.red.bold.underline('Server is down!'))
                    else {
                        console.log(error)
                        // console.log(chalk.red.bold.underline('PASESOCST failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
                    }
                })
        })
    program
        .command('resetvehicles')
        .action(function (command) {
            axios.get(`${base_url}/admin/resetvehicles/`)
                .then(function (response) {
                    console.log(response.data.status);
                })
                .catch(function (error) {
                    if (error.code == 'ECONNREFUSED')
                        console.log(chalk.red.bold.underline('Server is down!'))
                    else {
                        console.log(error)
                        // console.log(chalk.red.bold.underline('PASESOCST failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
                    }
                })
        })
    program
        .command('resetstations')
        .action(function (command) {
            axios.get(`${base_url}/admin/resetstations/`)
                .then(function (response) {
                    console.log(response.data.status);
                })
                .catch(function (error) {
                    if (error.code == 'ECONNREFUSED')
                        console.log(chalk.red.bold.underline('Server is down!'))
                    else {
                        console.log(error)
                        // console.log(chalk.red.bold.underline('PASESOCST failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
                    }
                })
        })



    program
        .command('passesperstation')
        .requiredOption('--station <value>', 'Operation name')
        .requiredOption('--datefrom <value>', 'Date from')
        .requiredOption('--dateto <value>', 'Date to')
        .requiredOption('--format <value>', 'format')
        .action(function (command) {
            axios.get(`${base_url}/PassesPerStation/${command.station}/${command.datefrom}/${command.dateto}`)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    if (error.code == 'ECONNREFUSED')
                        console.log(chalk.red.bold.underline('Server is down!'))
                    else {
                        console.log(error)
                        // console.log(chalk.red.bold.underline('PASESOCST failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
                    }
                })
        })


    program
        .command('passesanalysis')
        .requiredOption('--op1 <value>')
        .requiredOption('--op2 <value>')
        .requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
        .requiredOption('--format <value>')
        .action(function (command) {

            axios.get(`${base_url}/PassesAnalysis/${command.op1}/${command.op2}/${command.datefrom}/${command.dateto}/?format=${command.format}`)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    if (error.code == 'ECONNREFUSED')
                        console.log(chalk.red.bold.underline('Server is down!'))
                    else {
                        console.log(error)
                        // console.log(chalk.red.bold.underline('PASESOCST failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
                    }
                })
        })


    program
        .command('passescost')
        .requiredOption('--op1 <value>')
        .requiredOption('--op2 <value>')
        .requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
        .requiredOption('--format <value>')
        .action(function (command) {
            axios.get(`${base_url}/PassesCost/${command.op1}/${command.op2}/${command.datefrom}/${command.dateto}/?format=${command.format}`)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    if (error.code == 'ECONNREFUSED')
                        console.log(chalk.red.bold.underline('Server is down!'))
                    else {
                        console.log(error)
                        // console.log(chalk.red.bold.underline('PASESOCST failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
                    }
                })
        })

    program
        .command('chargesby')
        .requiredOption('--op1 <value>')
        .requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
        .requiredOption('--format <value>')
        .action(function (command) {
            axios.get(`${base_url}/ChargesBy/${command.op1}/${command.datefrom}/${command.dateto}/?format=${command.format}`)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    if (error.code == 'ECONNREFUSED')
                        console.log(chalk.red.bold.underline('Server is down!'))
                    else {
                        console.log(error)
                        // console.log(chalk.red.bold.underline('PASESOCST failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
                    }
                }
                )
        })



    program.parse(process.argv);
}

