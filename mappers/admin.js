"use strict";

const admin = require('../models/admin');

const imageUrl = require('config').get('image').url

exports.toModel = entity => {

    const model = {
        id: entity._id,
        name: entity.name,
        phoneNumber: entity.phoneNumber,
        role: entity.role,
        email: entity.email,
        college: entity.college,
        lastQualification: entity.lastQualification,
        token: entity.token,
        // fullName: entity.fullName,
        // lastName: entity.lastName,
        // position: entity.position,
        // agency: entity.agency,
        // DOB: entity.DOB,
        password: entity.password,
        // address: entity.address,
        // deviceToken: entity.deviceToken,
        // signature: entity.signature,
        image: entity.image ? `${imageUrl}${entity.image}` : "",
        createdOn: entity.createdOn,
        updatedOn:  entity.updatedOn,
    };

    if (entity.image && entity.image.gallery && entity.image.gallery.length > 0) {
        for (let index = 0; index < entity.image.gallery.length; index++) {
            entity.image.gallery[index].image = `${imageUrl}${entity.image.gallery[index].image}`;
        }
        model.gallery = entity.image.gallery
    }

    return model;

};


exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};