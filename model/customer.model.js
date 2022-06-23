exports.CustomerModel = class CustomerModel {
    constructor(customer_name, customer_email, customer_username, customer_password, customer_admin, customer_city, customer_country, customer_on_created, customer_on_update, gender, mobile) {
        this.customer_name = customer_name;
        this.customer_email = customer_email;
        this.customer_username = customer_username;
        this.customer_password = customer_password;
        this.customer_admin = customer_admin;
        this.customer_city = customer_city;
        this.customer_country = customer_country;
        this.customer_on_created = customer_on_created;
        this.customer_on_update = customer_on_update;
        this.gender = gender;
        this.mobile = mobile;
    }
}