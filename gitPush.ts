import { exec } from "child_process";
import path from "path";

const repoPath: string = path.resolve(__dirname);

function gitPush(): void {
    const commitMessage: string = `${new Date().toString()}`;
    const command: string = `git add . && git commit -m "${commitMessage}" && git push origin main`;

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
