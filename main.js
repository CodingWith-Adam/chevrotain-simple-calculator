import { allTokens } from "./tokens.js";
import { Lexer } from "chevrotain";
import CalculatorParser from "./CalculatorParser.js";
import CalculatorVisitor from "./CalculatorVisitor.js";

const input = "36+8-2";

//Lexer
const lexer = new Lexer(allTokens);
const { tokens } = lexer.tokenize(input);

//parser
const parser = new CalculatorParser();
parser.input = tokens;
const cst = parser.expression();

//visitor
const visitor = new CalculatorVisitor();
const result = visitor.visit(cst);

console.clear();
console.log(result);
