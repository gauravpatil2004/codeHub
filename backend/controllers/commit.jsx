const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), "myRepo");
  const stagingPath = path.join(repoPath, "staging");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitID = uuidv4();
    const commitDir = path.join(commitsPath, commitID);
    await fs.mkdir(commitDir, { recursive: true });

    const files = await fs.readdir(stagingPath);
    for (const file of files) {
      await fs.copyFile(
        path.join(stagingPath, file),
        path.join(commitDir, file)
      );
    }

    await fs.writeFile(
        path.join(commitDir, "commit.json"),
        JSON.stringify({ message, date: new Date().toISOString })
    );
    console.log(`Files committed with ID: ${commitID} and message: ${message}`);
  } catch (err) {
    console.error("Error committing files:", err);
  }
}

module.exports = { commitRepo };
