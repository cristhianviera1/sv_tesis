export default class CreateRoomDto {
    _id: string;
    fromUser: string;
    toUser: string;
    last_message: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    constructor(fromUser: string, toUser: string);
}
