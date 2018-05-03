import validator from 'validator';

// 邮箱验证
export function isEmail({ field, validator }) { 
  const isValid = validator.isEmail(field.value);
  return [isValid, `请输入正确的电子邮箱`];
}

// 手机验证
export function isPhone({ field, validator }) {
  const reg = /^1\d{10}$/;
  const isValid = reg.test(field.value);
  return [isValid, `请输入正确的手机号码`];
}

// 密码验证
export function isPassword({ field, validator }) {
  const reg = /^.{6,16}$/; // 6-16位任意字符
  const isValid = reg.test(field.value);
  return [isValid, `请输入6-16任意字符作为密码`];
}