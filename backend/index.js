const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.jsx");
const { addRepo } = require("./controllers/add.jsx");
const { commitRepo } = require("./controllers/commit.jsx");
const { pullRepo } = require("./controllers/pull.jsx");
const { pushRepo } = require("./controllers/push.jsx");
const { revertRepo } = require("./controllers/revert.jsx");

yargs(hideBin(process.argv))
  .command("init", "Initialised the new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a new file to repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "The file to added to staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "The commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command(
    "push", "Push commits to S3", {}, pushRepo
  )
  .command(
    "pull", "Pull commits from S3", {}, pullRepo
  )
  .command(
    "revert <commitId>",
    "Revert to a previous commit",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "The commit ID to revert to",
        type: "string",
      });
    },
    revertRepo
  )
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
