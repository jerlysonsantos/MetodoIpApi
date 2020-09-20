import { BaseEntity } from "typeorm";
export declare class Url extends BaseEntity {
    id: String;
    url: string;
    addId(): void;
}
