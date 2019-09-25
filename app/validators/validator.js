const { LinValidator,Rule } = require('../../core/lin-validator')
const { Users } = require('../models/user')
const { LoginType } = require('../lib/enum')

class PositiveIntValidator extends LinValidator {
  constructor(){
    super()
    this.id = [
      // 校验规则 提醒 规则补充
      new Rule('isInt','需要是正整数',{min:1}),
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor(){
    super()
    this.nickname = [
      new Rule('isLength','长度不符合规范',{
        min:3,
        max:32
      }),
    ]
    this.email = [
      new Rule('isEmail','不符合Email规范')
    ],
    this.password1 = [
      // 长度 特殊字符
      new Rule('isLength','长度不符合规范',{
        min:6,
        max:32
      }),
      new Rule('matches','密码中必须包含大写字母/小写字母/数字/特殊字符','^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$')
    ],
    this.password2 = this.password1
  }

  // LinValidator 自带的校验，必须以 validate 开头
  validatePassword(vals){
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if(psw1 !== psw2){
      throw new Error('两个密码必须相同')
    } 
  }

  async validateEmail(vals){
    const email = vals.body.email
    const result = await Users.findOne({
      where:{
        email
      }
    })
    if(result){
      throw new Error('Email 已存在')
    }
  }
}

class TokenValidator extends LinValidator {
  constructor(){
    super()
    this.account = [
      new Rule('isLength','账号不符合规范',{
        min:4,
        max:32
      })
    ],
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength','至少6个字符',{
        min:6,
        max:128
      })
    ] 
  }

  validateLoginType(vals){
    if(!vals.body.type){
      throw new Error('type 为必填参数')
    }
    if(!LoginType.isLoginType(vals.body.type)){
      throw new Error('type 不合法')
    }
  }
}

module.exports = {
  PositiveIntValidator,
  RegisterValidator,
  TokenValidator,
}