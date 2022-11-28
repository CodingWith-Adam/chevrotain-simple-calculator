import { tokenMatcher } from "chevrotain";
import CalculatorParser from "./CalculatorParser.js";
import { Plus } from "./tokens.js";

const parser = new CalculatorParser();
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export default class CalculatorVisitor extends BaseCstVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  expression(ctx) {
    return this.visit(ctx.additionExpression);
  }

  additionExpression(ctx) {
    let result = this.visit(ctx.lhs);

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, index) => {
        const rhsValue = this.visit(rhsOperand);
        const operator = ctx.PlusMinusOperator[index];

        if (tokenMatcher(operator, Plus)) {
          result += rhsValue;
        } else {
          result -= rhsValue;
        }
      });
    }

    return result;
  }

  atomicExpression(ctx) {
    const value = ctx.NumberLiteral[0].image;
    return Number(value);
  }
}
