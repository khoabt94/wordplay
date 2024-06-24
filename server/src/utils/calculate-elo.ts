export const recalculateElo = (winner_elo: number, loser_elo: number) => {
    return {
        winner_elo: winner_elo > loser_elo ? winner_elo + 25 : winner_elo + 50,
        loser_elo: winner_elo > loser_elo ? loser_elo - 25 : loser_elo - 50,
    }
}