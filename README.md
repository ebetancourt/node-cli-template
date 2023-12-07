# Node CLI Template

This is a simple starter project for creating a CLI with Node. Includes, out of the box:

- Full TypeScript Support
- Uses [Commander.js](https://github.com/tj/commander.js) to parse the sub-commands and options
- LocalStorage API support to persist data between runs (stored in the `cache` directory)
- Loading environment variables from `.env` courtesy of `dotenv`
- has built-in SQLite set up so you can save application data
- Built-in ORM for SQLite via [Sequelize](https://sequelize.org/)
- Supports migrations via [Sequelize CLI](https://github.com/sequelize/cli) (and generation of Models, Seeds, etc.)
- interactively prompt the user with [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- API calls over http(s) via Axios

Requires Node 18 or higher.
