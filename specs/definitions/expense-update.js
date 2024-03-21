module.exports = [
    {
        name: "expense-update",
        properties: {
            userId: { type: "string", },
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
            totalAmount:{ type: "number"},
            link: { type: "string", required: true },
            reason:{ type: "string"},

            status:{ type: "string"}

        }
    }
];
