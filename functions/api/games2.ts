interface Env {
    DB: D1Database;
}

type Games2PostBody = {
    winner: number;
    loser: number;
    dt: string;
};

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

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body: Games2PostBody = await context.request.json();
        const { winner, loser, dt } = body;
        if (winner === loser) {
            return new Response("Winner can't be the same as loser", { status: 400 });
        }
        const ps = context.env.DB.prepare("INSERT INTO games (winner, loser, dt) VALUES (?1, ?2, ?3)").bind(winner, loser, dt);
        const { success } = await ps.run();
        return Response.json(success)
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
};

