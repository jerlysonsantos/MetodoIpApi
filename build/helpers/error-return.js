"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorResponse = (res, err) => {
    if (process.env.NODE_ENV === 'development')
        console.log(err.message);
    if (err.message.includes('duplicate key value violates unique constraint')) {
        return res.status(400).json({
            message: 'Já existe um registro com essas informações!'
        });
    }
    if (err.message.includes('Not found!')) {
        return res.status(404).json({
            message: 'Não encontrado!'
        });
    }
    return res
        .status(500)
        .json({ message: 'Ops! Ocorreu um erro, tente novamente mais tarde.' });
};
exports.default = ErrorResponse;
//# sourceMappingURL=error-return.js.map