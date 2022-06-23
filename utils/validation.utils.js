var passwordValidator = require('password-validator');

var schema = new passwordValidator();


exports.requiredValid = (listValid) => {

    var isValid = true;

    if (listValid.includes("") || listValid.includes(undefined)) {
        isValid = false;
    }

    return isValid;
}

exports.passwordValid = (password) => {

    schema.is().min(8)
        .is().max(150)
        .has().uppercase()
        .has().lowercase()
        .has().digits(1)
        .has().not().spaces()

    return schema.validate(password);
}

