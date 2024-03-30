import fs from "fs";

export default function clearFile(path: string) {
  fs.writeFileSync(path, JSON.stringify([], null, 2));
}
