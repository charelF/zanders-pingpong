interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { searchParams } = new URL(context.request.url);
    const amount = parseInt(searchParams.get('limit') ?? '20', 10);

    const ps = context.env.DB.prepare(`
        SELECT 
            games.id,
            games.dt,
            winner_user.id AS winner_id,
            winner_user.username AS winner,
            loser_user.id AS loser_id,
            loser_user.username AS loser
        FROM 
            games
        JOIN 
            users AS winner_user ON games.winner = winner_user.id
        JOIN 
            users AS loser_user ON games.loser = loser_user.id
        ORDER BY 
            games.dt DESC
        LIMIT ?
    `).bind(amount);
    const { results } = await ps.all();
    return Response.json(results);
};

