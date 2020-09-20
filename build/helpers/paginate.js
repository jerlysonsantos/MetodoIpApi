"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PERPAGE = void 0;
exports.DEFAULT_PERPAGE = 100;
exports.default = (req) => {
    const { perpage, page, offset } = req.query;
    if (offset) {
        return {
            skip: Number(offset),
            take: 10,
        };
    }
    let take = exports.DEFAULT_PERPAGE;
    let skip = 0;
    if (typeof perpage === "string" && typeof page === "string") {
        take = parseInt(perpage) > 100 ? 100 : parseInt(perpage);
        skip = take * (parseInt(page) - 1) || 0;
    }
    return { skip, take };
};
//# sourceMappingURL=paginate.js.map