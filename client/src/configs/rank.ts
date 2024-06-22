export enum USER_RANK {
    NEWBIE,
    PROFESSIONAL,
    EXPERT,
    MASTER,
    LEGENDARY,
}


export const USER_RANK_CONFIG:
    {
        value: USER_RANK
        min: number,
        max?: number,
        color: "primary" | "secondary" | "success" | "warning" | "danger"
    }[] = [
        {
            value: USER_RANK.NEWBIE,
            min: 1,
            max: 500,
            color: 'warning',
        },
        {
            value: USER_RANK.PROFESSIONAL,
            min: 501,
            max: 1000,
            color: 'success',
        },
        {
            value: USER_RANK.EXPERT,
            min: 1001,
            max: 1500,
            color: 'secondary',
        },
        {
            value: USER_RANK.MASTER,
            min: 1501,
            max: 2000,
            color: 'primary',
        },
        {
            value: USER_RANK.LEGENDARY,
            min: 2001,
            color: 'danger',
        }
    ]