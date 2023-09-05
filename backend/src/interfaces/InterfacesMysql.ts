import { FieldPacket, ResultSetHeader } from 'mysql2';

export type ResultCreate = [ResultSetHeader, FieldPacket[]];