import { USER_RANK_CONFIG } from "@/configs/rank";

export const getUserLevel = (elo: number) => {
    const find = USER_RANK_CONFIG.find(({ min, max }) => {
        if (typeof max !== 'undefined') return elo >= min && elo <= max;
        else return elo >= min;
    })
    if (!find) return USER_RANK_CONFIG[0]
    return find
}