import {AbcMusicLanguage,dumpTree } from "../dist/index.js"
import {fileTests} from "@lezer/generator/dist/test"
import {expect} from 'chai'

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from 'url';
let caseDir = path.dirname(fileURLToPath(import.meta.url))


for (let file of fs.readdirSync(caseDir)) {
  if (!/\.txt$/.test(file)) continue

  let name = /^[^\.]*/.exec(file)[0]
  describe(name, () => {
    for (let {name, run} of fileTests(fs.readFileSync(path.join(caseDir, file), "utf8"), file)) 
      it(name, function () { 
        console.log('name :' + name)
        let newParser = AbcMusicLanguage.parser.configure({strict:false})
        run(newParser)
      })
  })
}

let minimalist = `
% this is a comment
X:1
K:G
`


let minimal = `
% comment
X: 1
T:Title 
K:G 
A2
w: words in score 
%
W: those are words
`

let sampleSource = `
% Default header template begins
% can be changed in preferences
%%vocalfont Bookman-Light 12
%%historyfont Bookman-Light 10
%%wordsfont Bookman-Light 14
%%composerfont Bookman-Light 12
%%titlefont Luminari 26
% this is a new comment
%
%
% ceci est un nouveau commentaire
% Default header template ends 
X: 1
T: The Mist Covered Mountain
R: jig
M: 6/8
L: 1/8
K: Ador
G|EAA ABd|e2 A AGE|~G3 GAB|dBA GED|
EAA ABd|e2A AGE|efg dBG|BAG A2:|
a|age a2b|age edB|AGE G2A|BAB GED|
age a2b|age edB|AGE G2A|BAG A3|
age a2b|age edB|AGE G2A|BAB GED|
EDE G2A|BAG ABd|efg dBG|BAG A2||
`
const selected = minimalist
describe("sampleAbcSource syntax tree test", () => {
  it('should return 0', function() {
    // Just get generated tree description
    //let output = dumpTree(selected)
    //console.log(output)
    expect(0).to.equal(0)
  })
})

