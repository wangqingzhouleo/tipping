'use strict'

const Promise = require('bluebird');
const pm2 = Promise.promisifyAll(require('pm2'));
const fs = Promise.promisifyAll(require('fs-extra'));
const ora = require('ora');
const path = require('path')

const ROOTPATH = process.cwd();

module.exports = {
	startInBackgroundMode: function () {
		let spinner = ora('Initializing...').start();
		return fs.emptyDirAsync(path.join(ROOTPATH, './logs')).then(() => {
			return pm2.connectAsync().then(() => {
				return pm2.startAsync({
					name: 'tipping',
					script: './server/index.js',
					cwd: ROOTPATH,
					output: path.join(ROOTPATH, './logs/tipping-output.log'),
					error: path.join(ROOTPATH, './logs/tipping-error.log'),
					minUptime: 5000,
					maxRestarts: 5
				}).then(() => {
					spinner.succeed('tipping.js has started successfully.');
				}).finally(() => {
					pm2.disconnect();
				})
			})
		}).catch(err => {
			spinner.fail(err)
			process.exit(1)
		})
	},
	stop () {
		let spinner = ora('Shutting down tipping.js...').start();
		return pm2.connectAsync().then(() => {
			return pm2.stopAsync('tipping').then(() => {
				spinner.succeed('tipping.js has stopped successfully.')
			}).finally(() => {
				pm2.disconnect();
			})
		}).catch(err => {
			spinner.fail(err)
			process.exit(1)
		})
	},
}