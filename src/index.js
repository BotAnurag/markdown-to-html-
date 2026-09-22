import fs from "fs";
import { IncomingMessage } from "http";

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

  let part = 0;
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
      // the idea is to find the ** and replace it with <strong>
      // we can ge the index of the ** and replace the string  string with <strong>
      if (line[i].includes("**")) {
        // for (let i = 0; i < splitParagraph.length; i++) {
        //   // console.log(splitParagraph[i]);
        // }
        console.log(line[i].indexOf("**"));
        let count = 0;
        const manipulateThis = line[i].split("");
        // this is for strong2
        for (
          let j = line[i].indexOf("**");
          j <= line[i].lastIndexOf("**") + 1;
          j++
        ) {
          // console.log(line[i][j]);
          // console.log(line[i][j]);
          if (line[i][j] === "*") {
            count++;
          }
          if (count === 0) continue;

          if (count % 2 === 0) {
            const toBeReplace = line[i][j] + line[i][j - 1];

            count = 0;
            part++;
            console.log(part);

            if (part % 2 === 1) {
              manipulateThis[j - 1] = "<strong>";

              manipulateThis[j] = "";
            }
            if (part % 2 === 0) {
              manipulateThis[j] = " ";
              manipulateThis[j - 1] = "</strong>";
              manipulateThis[j - 2] = "";
            }
          }
        }
        console.log(line[i].lastIndexOf("**"));

        // console.log(manipulateThis);

        html.push(`<p> ${manipulateThis.join("")}</P>`);
        // console.log(line[i]);
      } else {
        html.push(`<p>${line[i].trim()}</p>`);
        //   console.log("false", line[i]);
      }
    }
  }
  const htmlString = html.join("\n");
  console.log(htmlString);
});
