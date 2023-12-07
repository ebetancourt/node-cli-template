import { createCommand } from 'commander';
import * as appConfig from '../package.json'
import { input } from '@inquirer/prompts';

import 'dotenv/config';

const program = createCommand();

program
    .name(appConfig.name)
    .description(appConfig.description)
    .version(appConfig.version);

program.command('com')
    .description('This is a simple command, no arguments added')
    .action(async () => {
        const name = await input({ message: 'What is your name?' });
        console.log(``);
        console.log(``);
        console.log(`Hello ${name}!`);
        console.log(``);
        console.log(``);
    });

const defaultLoopCount = 10;
program.command('cnt')
    .description(`This is just a simple command with an optional count argument (default is ${defaultLoopCount})`)
    .option('-c, --count <count>', 'Number of times to loop', `${defaultLoopCount}`)
    .action(async (options) => {
        const { count } = options;
        console.log(``);
        console.log(``);
        console.log(`Count is ${count}`);
        console.log(``);
        console.log(``);
    });

program.parse();
