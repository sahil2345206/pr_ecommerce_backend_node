module.exports = [
    {
        name: "agency-create",
        properties: {
            name: { type: "string", required: true },
            address: { type: "string", required: true },
            email: { type: "string", required: true },
            contactNo: { type: "number", required: true },
            owner: { type: "string", required: true },
            manager: { type: "string", required: true, default: "" },
            companyLogo: { type: "string", default: "" },
        }
    }
];
