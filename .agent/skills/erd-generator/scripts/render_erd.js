import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, "../../../..");

const input = path.join(root, "docs", "architecture", "schema.mmd");
const output = path.join(root, "docs", "architecture", "erd.svg");

if (!fs.existsSync(input)) {
  console.error(`Missing Mermaid file: ${input}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(output), { recursive: true });

try {
  execFileSync(
    "npx",
    [
      "--yes",
      "@mermaid-js/mermaid-cli",
      "-i",
      input,
      "-o",
      output,
    ],
    {
      stdio: "inherit",
    }
  );

  console.log(`ERD generated successfully: ${output}`);
} catch (error) {
  console.error("Failed to generate ERD.");
  process.exit(1);
}