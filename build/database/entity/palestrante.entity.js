"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Palestrante = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Palestrante = (() => {
    let Palestrante = class Palestrante extends typeorm_1.BaseEntity {
        addId() {
            this.id = uuid_1.v4();
        }
    };
    __decorate([
        typeorm_1.PrimaryColumn("uuid"),
        __metadata("design:type", String)
    ], Palestrante.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Palestrante.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Palestrante.prototype, "instagram", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Palestrante.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Palestrante.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Palestrante.prototype, "addId", null);
    Palestrante = __decorate([
        typeorm_1.Entity({ name: "palestrantes" })
    ], Palestrante);
    return Palestrante;
})();
exports.Palestrante = Palestrante;
//# sourceMappingURL=palestrante.entity.js.map