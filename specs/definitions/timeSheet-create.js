module.exports = [{
    name: "createTimeSheet",
    properties: {
        agencyId: { type: "string" },
        userId: { type: "string" },
        clientId: { type: "string" },
        managerId: { type: "string" },
        weekOfDays: {
            type: "array",
            items: {
                properties: {
                    date: { type: "date", required: true },
                    day: { type: "string", required: true },
                    summary: { type: "string", required: true },
                    start: { type: "string", required: true },
                    end: { type: "string", required: true },
                    break: { type: "string", required: true },
                    hour: { type: "string", required: true },
                    comment: { type: "string", required: true }
                }
            }

        },
        reason: { type: "string" },
        total: { type: "number", },
        link: { type: "string", required: true },
        status: { type: "string" }
    }
}];