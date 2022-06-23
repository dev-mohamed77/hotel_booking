var events = require("events");
const { constant } = require("../utils/constant");
const AuditModel = require("../model/audit.model");
const dbQuery = require("../db_config/queries");
const dbConnection = require("../db_config/connection");

var emitter = new events.EventEmitter();



emitter.on(constant.auditEvent, async function (audit) {

    try {

        const values = [audit.auditAction, JSON.stringify(audit.data), audit.status, JSON.stringify(audit.error), audit.auditBy, audit.auditOn];
        const query = dbQuery.queryList.ADD_AUDIT;
        await dbConnection.db_query(query, values);

    } catch (err) {
        console.log("Audit Event Emitter - error" + err);
    }
});

exports.prepareAudit = function (auditAction, data, error, auditBy, auditOn) {

    let status = 200;

    if (error) {
        status = 500;
    }

    var auditObj = new AuditModel.Audit(auditAction, data, status, error, auditBy, auditOn);

    emitter.emit(constant.auditEvent, auditObj)


}