import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import {printTree } from './print-lezer-tree'

export const AbcMusicLanguage = LRLanguage.define({
  parser: parser.configure({
    strict : false,
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Identifier: t.variableName,
        Composer: t.keyword,
        Key: t.keyword,
        Length: t.keyword,
        Meter: t.keyword,
        Notes: t.keyword,
        Origin: t.keyword,
        Tempo: t.keyword,
        Rythm: t.keyword,
        Source: t.keyword,
        Book: t.keyword,
        Discography: t.keyword,
        File: t.keyword,
        Title: t.keyword,
        Transcription: t.keyword,
        Voice: t.keyword,
        Words: t.keyword,
        Redefine: t.keyword,
        Bar: t.bracket ,
        Instructions: t.meta,
        TermRepeat: t.bracket ,
        ChordStart: t.bracket ,
        ChordEnd: t.bracket ,
        ReferenceNumber : t.bool ,
        Informations: t.string,
        LineComment: t.lineComment,
        NoteRythm: t.character,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

export function abcMusic() {
  return new LanguageSupport(AbcMusicLanguage)
}

/**
 * Dump produced tree grammar
 */
export function dumpTree( source : string ) {
  let newParser = AbcMusicLanguage.parser.configure({strict:false})
  let tree = newParser.parse(source)
  let curCursor = tree.cursor()
  console.log(curCursor.toString())
  return printTree(tree,source)
}