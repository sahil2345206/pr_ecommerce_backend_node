module.exports = [{
    name: "updateTimeSheet",
    properties: {
        userId: { type: "string" },
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
                    comment: { type: "string", required: true }
                }
            }
        },
        total: { type: "number", },
        status: { type: "string" },
        reason:{ type: "string"},

    }
}];