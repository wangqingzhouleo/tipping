
'use strict'



const init = require('./server/init.js');

require('yargs') // eslint-disable-line no-unused-expressions
.usage('Usage: node $0 <cmd> [args]')
.command({
    command: 'start',
    alias: ['boot', 'init'],
    desc: 'Start tipping process',
    handler: argv => {
        init.startInBackgroundMode();
    }
}).command({
    command: 'stop',
    alias: ['quit', 'exit'],
    desc: 'Stop tipping.js process',
    handler: argv => {
        init.stop()
    }
}).command({
    command: 'restart',
    desc: 'restart tipping.js process',
    handler: argv => {
        init.stop();
        init.startInBackgroundMode();
    }
})
.recommendCommands()
.demandCommand(1, 'You must provide one of the accepted commands above.')
.help()
.version()
.epilogue('Read the docs at https://wiki.requarks.io')
.argv
