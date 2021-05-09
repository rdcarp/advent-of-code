import fs from "fs"
import path from "path"

const commaSeparatedList = function (inputText: string, separator = ",") {
  return inputText.split(separator)
}

const inputAsLines = function (inputText: string) {
  return inputText.split(/\r?\n/)
}

const loadInput = function (year: number, day: number) {
  const zeroFilledDay = ("00" + day).slice(-2)
  return fs
    .readFileSync(
      path.join(
        __dirname,
        `../../../../puzzles/${year}/${zeroFilledDay}/puzzleinput`,
      ),
    )
    .toString()
}

export { commaSeparatedList, loadInput, inputAsLines }
