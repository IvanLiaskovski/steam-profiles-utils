import fs from "fs";

export default function appendToJSON(
  data: { [i: string]: any }[] | string,
  path: string
) {
  const file = fs.readFileSync(path, "utf-8");
  const parsedFile = JSON.parse(file);
  if (Array.isArray(data)) {
    parsedFile.push(...data);
  } else {
    parsedFile.push(data);
  }

  fs.writeFileSync(path, JSON.stringify(parsedFile));
}
