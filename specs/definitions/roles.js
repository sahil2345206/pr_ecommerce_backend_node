module.exports = [{
    name: "roleCreate",
    properties: {
        type: {
            type: "string"
        },
        permissions: {
            properties: {
                view: { type: "boolean", default: false },
                add: { type: "boolean", default: false },
                edit: { type: "boolean", default: false },
                all: { type: "boolean", default: false },
            }
        }
    },
}
];