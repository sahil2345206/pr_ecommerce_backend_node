"use strict";

const course = require("../models/course")

const imageUrl = require('config').get('image').url

exports.toModel = entity => {

    const model = {
        id: entity.id,
        name: entity.name,
        category: entity.category,
        // image: entity.image ? `${imageUrl}${entity.image.image}` : "",
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