export enum ServerToClientEventsKeys {
    unauthenticated = 'unauthenticated',
    create_table = 'create_table',
    cancel_match = 'cancel_match',
    join_specific_table_error = 'join_specific_table_error',
    number_users_online = 'number_users_online',
    joining_match = 'joining_match',
    disconnect = 'disconnect',

    // match
    match_start = 'match_start',
    opponent_answer = 'opponent_answer',
    match_end = 'match_end',
}

export enum ClientToServerEventsKeys {
    authenticate = 'authenticate',
    find_match = 'find_match',
    cancel_match = 'cancel_match',
    join_specific_table = 'join_specific_table',
    disconnect = 'disconnect',

    // match
    joined_match = 'joined_match',
    answer = 'answer',
    time_out = 'time_out'
}
