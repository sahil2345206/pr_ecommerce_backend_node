module.exports = [
    {
        name: "clientCreate",
        properties: {
            agencyId: {
                type: "string"
            },
            name: {
                type: "string"
            },
            phonenumber: {
                type: "string"
            },
            email: {
                type: "string"
            },
            description: {
                type: "string"
            },
            managers: {
                type: "array",
                items: {
                    type: "string",
                }
            },
        },
    }

];