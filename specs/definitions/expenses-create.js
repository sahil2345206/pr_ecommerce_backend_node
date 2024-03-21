module.exports = [
    {
        name: "expense-create",
        properties: {
            agencyId: { type: "string" },
            userId: { type: "string", },
            clientId: { type: "string", },
            managerId: { type: "string", },
            assignment: { type: "string" },
            location: { type: "string" },
            expenses: {
                type: "array", items: {
                    properties: {
                        date: { type: "date" },
                        recNo: { type: "string" },
                        amount: { type: "number" },
                        currency: { type: "string" },
                        details: { type: "string" }
                    }
                }
            },
            totalAmount: { type: "number" },
            approved: { type: "boolean", default: false },
            reason: { type: "string" },

            link: { type: "string", required: true }
        }
    }
];
