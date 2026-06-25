const { spawn, spawnSync } = require("child_process");
const path = require("path");

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const projectRoot = process.cwd();
const pgBin = "C:\\Program Files\\PostgreSQL\\18\\bin";
const pgData = path.join(projectRoot, ".local-postgres-data");
const pgLog = path.join(projectRoot, ".local-postgres.log");

function startLocalPostgres() {
  if (process.platform !== "win32") return;

  const pgIsReady = path.join(pgBin, "pg_isready.exe");
  const pgCtl = path.join(pgBin, "pg_ctl.exe");

  const ready = spawnSync(pgIsReady, ["-h", "localhost", "-p", "5433"], {
    stdio: "ignore",
  });

  if (ready.status === 0) {
    console.log("[postgres] local listo en localhost:5433");
    return;
  }

  const started = spawnSync(pgCtl, ["-D", pgData, "-o", "-p 5433", "-l", pgLog, "start"], {
    stdio: "inherit",
  });

  if (started.status === 0) {
    console.log("[postgres] local iniciado en localhost:5433");
  } else {
    console.warn("[postgres] no se pudo iniciar automaticamente. Revisa .local-postgres.log");
  }
}

startLocalPostgres();

const processes = [
  {
    name: "backend",
    command: `${npmCommand} run dev`,
    cwd: path.join(projectRoot, "Backend"),
  },
  {
    name: "client",
    command: `${npmCommand} run dev`,
    cwd: path.join(projectRoot, "Cliente"),
  },
];

const children = processes.map(({ name, command, cwd }) => {
  const child = spawn(command, {
    cwd,
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] termino con codigo ${code}`);
    }
  });

  return child;
});

function stopChildren() {
  for (const child of children) {
    if (!child.killed) child.kill();
  }
}

process.on("SIGINT", () => {
  stopChildren();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stopChildren();
  process.exit(0);
});
