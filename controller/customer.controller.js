const { queryList } = require("../db_config/queries");
const connection = require("../db_config/connection");
const LoggerService = require("../services/logger.services");
const dateFormateUtils = require("../utils/date_format.utils");
const auditService = require("../audit/audit.services");
const auditAction = require("../audit/audit_action");
const ApiError = require("../error/api.error");
const { HttpStatusCode } = require("../utils/status_code.utils");

var logger = new LoggerService('customer.controller');


exports.get_customer_list = async (req, res, next) => {

    var dateFormat = dateFormateUtils.dateFormat();

    try {

        const customer_query = queryList.GET_CUSTOMER_LIST;
        const customer_list = await connection.db_query(customer_query);

        // logger info
        logger.info("Info Return Customer List", customer_list);

        // audit service
        auditService.prepareAudit(auditAction.auditAction.GET_CUSTOMER_LIST, customer_list, null, "postman", dateFormat);

        // res data
        res.status(200).json({
            status: true,
            result: customer_list,
        });

    } catch (err) {

        // logger error
        logger.error("Error Return Customer List", err);

        // Audit Error
        auditService.prepareAudit(auditAction.auditAction.GET_CUSTOMER_LIST, null, err, "postman", dateFormat)

        // res error
        res.status(200).json({
            status: false,
            result: "Error in getting customer list",
            err: err
        });


    }

}


exports.add_customer = async (req, res, next) => {

}


exports.updateCustomer = async (req, res, next) => {

    const id = req.params.id;
    const name = req.body.name;
    const password = req.body.password;
    const city = req.body.city;
    const country = req.body.country;
    const gender = req.body.gender;
    const mobile = req.body.mobile;
    const onUpdate = dateFormateUtils.dateFormat();

    try {

        if (isNaN(id)) {
            const message = "Please enter the number value in params"

            logger.error(message);

            throw new ApiError("Params Number", HttpStatusCode.BAD_REQUEST, message, true);
        }


        const userQuery = queryList.CHECK_USER_EXIST;

        const checkUser = await connection.db_query(userQuery, [id])


        // if user exists
        if (checkUser.length == 0) {
            const message = "User not exist";
            logger.error(message)
            throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message, true);
        }

        const values = [name, password, city, country, onUpdate, gender, mobile, id];

        const db_query = queryList.UPDATE_CUSTOMER;

        const updateCustomer = await connection.db_query(db_query, values);

        logger.info("Update Customer Successfully", updateCustomer);

        auditService.prepareAudit(auditAction.auditAction.UPDATE_CUSTOMER, updateCustomer, null, "postman", onUpdate)

        res.status(200).json({
            status: true,
            result: "Update Successfully"
        })



    } catch (err) {

        logger.error("Error Update Customer", err);

        auditService.prepareAudit(auditAction.auditAction.UPDATE_CUSTOMER, null, err, "postman", onUpdate);


        res.status(200).json({
            status: false,
            result: err
        })

    }

}