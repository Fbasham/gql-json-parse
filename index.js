const data = require("./data/r.json");
const fs = require("fs");

function flatten(data, skip = 0, prefix = "") {
  let r = [];
  function f(data, t = []) {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        f(data[i], t.slice(0, -1).concat(`${t.at(-1)}[${i}]`));
      }
    } else if (typeof data === "object") {
      for (let k in data) {
        f(data[k], [...t, k]);
      }
    } else {
      r.push(
        [data, (prefix ? prefix + "." : "") + t.slice(skip).join`.`].join`\n`
      );
    }
  }
  f(data);
  return r;
}

let r = flatten(data, 3, (prefix = "pageData"));
fs.writeFile("clean.txt", r.join`\n\n`, (err) => null);
