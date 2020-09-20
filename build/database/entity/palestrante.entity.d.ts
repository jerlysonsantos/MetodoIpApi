import { BaseEntity } from "typeorm";
export declare class Palestrante extends BaseEntity {
    id: String;
    name: string;
    instagram: string;
    created_at: Date;
    updated_at: Date;
    addId(): void;
}
