
exports.queryList = {
    GET_CUSTOMER_LIST: 'SELECT * FROM customer',
    ADD_CUSTOMER: 'INSERT INTO customer (customer_name, customer_email, customer_username, customer_password, customer_city, customer_country,customer_on_created ,gender, mobile) VALUE (?, ?, ?, ?, ?, ?,? , ?, ?)',
    UPDATE_CUSTOMER: "UPDATE customer SET customer_name = ? , customer_password = ? , customer_city = ? , customer_country = ? , customer_on_update = ? , gender = ? , mobile = ? WHERE customer_id = ?",
    DELETE_CUSTOMER: "",
    CHECK_USER_EXIST: "SELECT * FROM customer WHERE customer_id = ?",
    CHECK_USERNAME_AND_EMAIL_EXIST: "SELECT * FROM customer WHERE customer_username = ? OR customer_email = ?",
    CHECK_USERNAME_EXIST: "SELECT * FROM customer WHERE customer_username = ? ",
    GET_CUSTOMER_BY_ID: "SELECT * FROM customer WHERE customer_id == customer.customer_id",
    ADD_AUDIT: "INSERT INTO audit(audit_action, audit_data, audit_status, audit_error, audit_by, audit_on) VALUE(?,?,?,?,?,?)"
};

