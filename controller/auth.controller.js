const Logger = require("../services/logger.services");
const auditService = require("../audit/audit.services");
const { auditAction } = require("../audit/audit_action");
const { queryList } = require("../db_config/queries");
const db_connection = require("../db_config/connection");
const { requiredValid, passwordValid } = require("../utils/validation.utils");
const bcrypt = require("bcrypt");
const ApiError = require("../error/api.error");
const { HttpStatusCode } = require("../utils/status_code.utils");
const dateFormateUtils = require("../utils/date_format.utils");
const { jwtSign } = require("../middleware/jwt.middleware");

var logger = new Logger("auth.controller");

exports.user_register = async (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const city = req.body.city;
    const country = req.body.country;
    const gender = req.body.gender;
    const mobile = req.body.mobile;
    const onCreated = dateFormateUtils.dateFormat();

    try {


        // check require 

        if (!requiredValid([name, email, username, password, city, country, mobile, gender])) {
            const message = "name , email , username , gender , mobile are require";
            logger.error(message);
            throw new ApiError("Field Required", HttpStatusCode.BAD_REQUEST, message, true);
        }


        // check user exist by username , email
        const query_user = queryList.CHECK_USERNAME_AND_EMAIL_EXIST;
        const values_user = [username, email];
        const checkUserExist = await db_connection.db_query(query_user, values_user);

        console.log(checkUserExist);

        if (checkUserExist.length > 0) {
            const message = "username or email exists";
            logger.error(message)
            throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message, true);
        }

        console.log(passwordValid(password));

        if (!passwordValid(password)) {
            const message = "password not Valid";
            logger.error(message);
            throw new ApiError("password Valid", HttpStatusCode.BAD_REQUEST, message, true);
        }

        const hash = await bcrypt.hash(password, 10);

        const customer_query = queryList.ADD_CUSTOMER;

        console.log("Add Customer " + customer_query);

        const value = [name, email, username, hash, city, country, onCreated, gender, mobile]


        const add_customer = await db_connection.db_query(customer_query, value);

        // logger 
        logger.info("RETURN ADD CUSTOMER SUCCESSFULLY", add_customer);

        // Audit prepare Successfully
        auditService.prepareAudit(auditAction.ADD_CUSTOMER, add_customer, null, "postman", onCreated);

        res.status(200).json({
            status: true,
            message: "Add user Successfully",
            result: add_customer
        });


    } catch (err) {
        // logger error
        logger.error("Error Adding Customer", err);

        // Audit Error
        auditService.prepareAudit(auditAction.ADD_CUSTOMER, null, err, "postman", onCreated)

        res.status(200).json({
            status: false,
            err: err
        });

    }

}


exports.userLogin = async (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    try {

        if (!requiredValid([username, password])) {
            const message = " username , password are require";
            logger.error(message);
            throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message, true);
        }

        const values = [username];
        const query = queryList.CHECK_USERNAME_EXIST;
        const user = await db_connection.db_query(query, values);


        if (user.length == 0) {
            const message = "Wrong username";
            logger.error(message);
            throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message, true);
        }

        const encodedPassword = await bcrypt.compare(password, user[0].customer_password)

        if (!encodedPassword) {
            const message = "Wrong password";
            logger.error(message);
            throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message, true);
        }

        const token = jwtSign({
            id: user[0].customer_id,
            username: user[0].customer_username,
            email: user[0].customer_email,
            admin: user[0].customer_admin,
        })


        res.status(200).json({
            status: true,
            result: "Login Successfully",
            data: user,
            token: token
        });




    } catch (err) {
        // logger error
        logger.error("Error login", err);

        // Audit Error
        auditService.prepareAudit(auditAction.USER_LOGIN, null, err, "postman", dateFormateUtils.dateFormat())

        // res error
        res.status(200).json({
            status: false,
            result: "Error in Login",
            err: err
        });
    }

}
