import {ExternalTokenizer} from "@lezer/lr"
import {
  Emptyline ,
  Instruction,
  LineComment
} from "./syntax.grammar.terms"

const newline = 10, space = 32, tab = 9, hash = 35

export const externalHandler = new ExternalTokenizer((input, stack) => {
  let prev = input.peek(-1);
  // if (prev != -1 && prev != newline) return
  // let spaces = 0;
  while (input.next == space || input.next == tab ) { input.advance() }
  if ((input.next == newline && ( prev == newline || prev == -1) )) {
    input.advance(); 
    input.acceptToken(Emptyline);
  } else {
    if ( String.fromCharCode(input.next) == '%') {
      const nextOne = input.peek(+1)
      if ( String.fromCharCode(nextOne) == '%' ) {
        input.advance(2); 
        input.acceptToken(Instruction);
      } else {
        // pure comment => just consume to bypass 
        while (String.fromCharCode(input.next) != '\n' && input.next != -1 ) { input.advance(); }
        input.acceptToken(LineComment)
      }  
    }
  } 
});

