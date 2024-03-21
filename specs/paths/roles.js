module.exports = [{
    url: "/create",
    post: {
        summary: "create",
        description: "create",
        parameters: [{
            in: "body",
            name: "body",
            description: "Model of role Create creation",
            required: true,
            schema: {
                $ref: "#/definitions/roleCreate"
            }
        }],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},

{
    url: "/delete/{id}",
    delete: {
        summary: "delete roles",
        description: "delete roles",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "enter header token",
                type: "string",
                required: false,
            },
            {
                in: "path",
                name: "id",
                description: "Model of delete roles",
                type: "string",
                required: true,
            }
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},
{
    url: "/getRoles",
    get: {
        summary: "getRoles ",
        description: "Just hit the api",
        parameters: [
            // {
            //     in: "header",
            //     name: "x-access-token",
            //     description: "enter header token",
            //     type: "string",
            //     required: false,
            // },
            // {
            //     in: "path",
            //     name: "id",
            //     description: "agency id",
            //     required: true,
            //     type: "string",

            // },
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},]