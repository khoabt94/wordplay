export enum ServerToClientEventsKeys {
    unauthenticated = 'unauthenticated',
    create_table = 'create_table',
    cancel_match = 'cancel_match',
    join_specific_table_error = 'join_specific_table_error',
    number_users_online = 'number_users_online',
    join_table = 'join_table',
    disconnect = 'disconnect'
}

export enum ClientToServerEventsKeys {
    authenticate = 'authenticate',
    find_match = 'find_match',
    cancel_match = 'cancel_match',
    join_specific_table = 'join_specific_table',
    disconnect = 'disconnect',
}