"use strict";
exports.__esModule = true;
exports.typeormConfig = void 0;
exports.typeormConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: '',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true
};
