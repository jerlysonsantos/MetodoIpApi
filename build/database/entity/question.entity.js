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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const user_entity_1 = require("./user.entity");
let Question = (() => {
    let Question = class Question extends typeorm_1.BaseEntity {
        addId() {
            this.id = uuid_1.v4();
        }
    };
    __decorate([
        typeorm_1.PrimaryColumn('uuid'),
        __metadata("design:type", String)
    ], Question.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.id),
        typeorm_1.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", user_entity_1.User)
    ], Question.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Question.prototype, "tema", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Question.prototype, "dateTime", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Question.prototype, "text", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Question.prototype, "resposta", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Question.prototype, "selected", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Question.prototype, "selectedToPablo", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Question.prototype, "is_active", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Question.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Question.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Question.prototype, "addId", null);
    Question = __decorate([
        typeorm_1.Entity({ name: 'question' })
    ], Question);
    return Question;
})();
exports.Question = Question;
//# sourceMappingURL=question.entity.js.map