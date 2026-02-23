import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const fromStatic = path.join(root, ".next", "static");
const fromPublic = path.join(root, "public");

const toStatic = path.join(root, ".next", "standalone", ".next", "static");
const toPublic = path.join(root, ".next", "standalone", "public");

async function main() {
  if (!existsSync(path.join(root, ".next", "standalone"))) {
    console.error("Missing .next/standalone. Did you run `next build` with output:'standalone'?");
    process.exit(1);
  }

  await mkdir(toStatic, { recursive: true });
  await mkdir(toPublic, { recursive: true });

  if (existsSync(fromStatic)) {
    await cp(fromStatic, toStatic, { recursive: true, force: true });
  }
  if (existsSync(fromPublic)) {
    await cp(fromPublic, toPublic, { recursive: true, force: true });
  }

  console.log("✅ Copied .next/static and public into .next/standalone");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
