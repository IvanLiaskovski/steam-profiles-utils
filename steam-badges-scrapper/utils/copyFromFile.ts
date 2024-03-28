import fs from "fs";

export default function copyFile(sourceFile: string, destinationFile: string) {
  fs.readFile(sourceFile, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${sourceFile}: ${err}`);
      return;
    }

    // Write the data into the destination file
    fs.writeFile(destinationFile, data, (err) => {
      if (err) {
        console.error(`Error writing to file ${destinationFile}: ${err}`);
        return;
      }
      console.log(
        `Data from ${sourceFile} copied to ${destinationFile} successfully.`
      );
    });
  });
}
