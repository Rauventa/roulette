import validator from "validator";

export const inputValidator = (data: any) => {

  console.log('data ', data)

  let errors: any = {}

  if (data.hasOwnProperty('license')) {
    if (!data.license) {
      errors.license = 'You must agree'
    }
  }

  if (data.hasOwnProperty('email')) {
    if (!validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  }

  if (data.hasOwnProperty('phone')) {
    if (validator.isLength(data.phone) && data.phone=="") {
      errors.phone = 'Phone is invalid';
    }
  }

  if (data.hasOwnProperty('password')) {
    if (!validator.isLength(data.password, {min: 8})) {
      errors.password = 'Min length of password is 8 letters';
    }
    if (validator.isEmpty(data.password)) {
      errors.password = 'This field is required';
    }
  }

  if (data.hasOwnProperty('confirmPassword')) {
    if (!validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = 'Passwords must match';
    }
    if (validator.isEmpty(data.confirmPassword)) {
      errors.confirmPassword = 'This field is required';
    }
  }

  return {errors}
}