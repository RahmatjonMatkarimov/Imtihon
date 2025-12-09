const { exec } = require("child_process");
const path = require("path");

const repoPath = path.resolve(__dirname); 

function gitPush() {
    const commitMessage = `${new Date().toString()}`;
    const command = `git add . && git commit -m "${commitMessage}" && git push origin main`;

    exec(command, { cwd: repoPath }, (err, stdout, stderr) => {
        if (err) {
            console.error("Xatolik:", err);
            return;
        }
        if (stderr && !stderr.includes("nothing to commit")) {
            console.error("Git xatolik:", stderr);
            return;
        }
        console.log("Git push natija:", stdout || "Hech narsa commit qilinmadi.");
    });
}
 
gitPush();
