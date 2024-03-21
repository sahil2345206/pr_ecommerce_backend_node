"use strict";
const service = require("../services/roles");
const response = require("../exchange/response");

const create = async(req, res) => {
    const log = req.context.logger.start(`api:roles:create`);
    try {
        const role = await service.create(req.body, req.context);
        const message = "role created Successfully";
        log.end();
        return response.success(res, message, role);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getRoles = async(req, res) => {
    const log = req.context.logger.start(`api:roles:getRoles`);
    try {
        const roles = await service.getRoles(req.body, req.context);
        log.end();
        return response.data(res, roles);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteRole = async(req, res) => {
    const log = req.context.logger.start(`api:roles:deleteRole`);
    try {
        const role = await service.deleteRole(req.params.id, req.context);
        log.end();
        return response.data(res, role);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.getRoles = getRoles;
exports.deleteRole = deleteRole;