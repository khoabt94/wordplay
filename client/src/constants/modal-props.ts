export const motionProps = {
    variants: {
        enter: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
        exit: {
            y: -20,
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: "easeIn",
            },
        },
    }
}

export enum RESULT_MODAL_TYPE {
    WINNER = 'WINNER',
    LOSER = 'LOSER'
}