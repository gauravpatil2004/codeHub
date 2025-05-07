const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.jsx");
const { addRepo } = require("./controllers/add.jsx");

yargs(hideBin(process.argv))
  .command("init", "Initialised the new repository", {}, initRepo)
  .command("add <file>", "Add a new file to repository", (yargs) => {
    yargs.positional("file", {
      describe: "The file to added to staging area",
      type: "string",
    });
  }, addRepo)
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
