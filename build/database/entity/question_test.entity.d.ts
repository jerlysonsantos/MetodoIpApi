import { BaseEntity } from 'typeorm';
export declare class QuestionTest extends BaseEntity {
    id: String;
    nome: string;
    whatsapp: string;
    text: string;
    selected: boolean;
    created_at: Date;
    updated_at: Date;
    addId(): void;
}
