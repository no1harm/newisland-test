const { LinValidator,Rule } = require('../../core/lin-validator')

class PositiveIntValidator extends LinValidator {
  constructor(){
    super()
    this.id = [
      // 校验规则 提醒 规则补充
      new Rule('isInt','需要是正整数',{min:1}),
    ]
  }
}

module.exports = {
  PositiveIntValidator,
}