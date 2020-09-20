"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate_1 = require("./paginate");
exports.default = (req, res, entity) => {
    let { page, perpage } = req.query;
    if (!page)
        page = 1;
    if (!perpage)
        perpage = paginate_1.DEFAULT_PERPAGE;
    if (typeof perpage === 'string' && typeof page === 'string') {
        perpage = parseInt(perpage) > 100 ? 100 : parseInt(perpage);
        page = parseInt(page);
    }
    const lastpage = Math.round(entity[1] / perpage) > 0 ? Math.round(entity[1] / perpage) : 1;
    return res.jsonp({
        perpage,
        page,
        lastpage,
        total: entity[1],
        result: entity[0]
    });
};
//# sourceMappingURL=success-return.js.map