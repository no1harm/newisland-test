const { LinValidator,Rule } = require('../../core/lin-validator')
const { Users } = require('../models/user')
const { LoginType,ArtType } = require('../lib/enum')

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
    this.validateType = checkType
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
}

class NoEmptyValidator extends LinValidator {
  constructor(){
    super()
    this.token = [
      new Rule('isLength','token 不可为空', {
        min:1
      })
    ]
  }
}

function checkType(vals){
  if(!vals.body.type){
    throw new Error('type 为必填参数')
  }
  if(!LoginType.isLoginType(vals.body.type)){
    throw new Error('type 不合法')
  }
}

function checkArtType(vals){
  const type = vals.body.type || vals.path.type
  if(!type){
    throw new Error('type 为必填参数')
  }
  if(!ArtType.isArtType(type)){
    throw new Error('type 不合法')
  }
}

class LikeValidator extends PositiveIntValidator {
  constructor(){
    super()
    this.validateType = checkArtType
  }
}

class ClassicValidator extends LikeValidator {
  constructor(){
    super()
  }
}

class SearchBookValidator extends LinValidator {
  constructor(){
    super()
    this.q = [
      new Rule('isLength','长度不符合规范',{
        min:1,
        max:16
      })
    ]
    this.count = [
      new Rule('isInt','不符合规范',{
        min:1,
        max:20
      }),
      new Rule('isOptional','',5)
    ]
    this.start = [
      new Rule('isInt','不符合规范',{
        min:1,
        max:60000
      }),
      new Rule('isOptional','',1)
    ]
  }
}

module.exports = {
  PositiveIntValidator,
  RegisterValidator,
  TokenValidator,
  NoEmptyValidator,
  LikeValidator,
  ClassicValidator,
  SearchBookValidator
}