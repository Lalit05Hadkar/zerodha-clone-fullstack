const { spawn } = require("child_process");
const path = require("path");

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";

function startService(name, dir, command, args, extraEnv = {}) {
  console.log(`Starting ${name}...`);
  const child = spawn(command, args, {
    cwd: path.join(__dirname, dir),
    shell: true,
    stdio: "inherit",
    env: { ...process.env, ...extraEnv },
  });

  child.on("error", (err) => {
    console.error(`[${name}] Error:`, err.message);
  });

  child.on("close", (code) => {
    console.log(`[${name}] Process exited with code ${code}`);
  });

  return child;
}

console.log("==========================================");
console.log("       ZERODHA FULL STACK APPS            ");
console.log("==========================================");
console.log("Frontend:   http://localhost:3000");
console.log("Dashboard:  http://localhost:3001");
console.log("Backend:    http://localhost:3002");
console.log("==========================================");

startService("BACKEND", "backend", "node", ["index.js"]);
startService("DASHBOARD", "dashboard", npmCmd, ["start"], { BROWSER: "none", PORT: "3001" });
startService("FRONTEND", "frontend", npmCmd, ["start"], { BROWSER: "none", PORT: "3000" });
