import fs from "fs";

fs.readFile("test.md", "utf-8", (error, data) => {
  if (error) {
    console.log(error);
  }

  const html = [];
  const mapForHeading = new Map([
    [1, "h1"],
    [2, "h2"],
    [3, "h3"],
    [4, "h4"],
    [5, "h5"],
    [6, "h6"],
  ]);

  //   console.log(data);
  const line = data.split("\n"); // split the text after new line
  //   console.log(line);
  for (let i = 0; i < line.length; i++) {
    if (line[i].startsWith("#")) {
      const stringArray = line[i].split(" "); //split the line again into an array to find the  number of #

      //   console.log(stringArray[0].length);
      if (stringArray[0].length > 0) {
        // console.log(`heading level ${stringArray[0].length}`);
        // console.log(mapForHeading.get(stringArray[0].length));
        html.push(
          `<${mapForHeading.get(stringArray[0].length)}>${line[i].slice(stringArray[0].length).trim()}</${mapForHeading.get(stringArray[0].length)}>`,
        );

        // console.log(`heading text : ${line[i].slice(stringArray[0].length)}`);
      }
    } else {
      if (line[i].length === 0) {
        continue;
      }

      html.push(`<p>${line[i].trim()}</p>`);
      //   console.log("false", line[i]);
    }
  }
  const htmlString = html.join("\n");
  console.log(html);
  console.log(htmlString);
});
