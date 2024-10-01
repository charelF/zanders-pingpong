interface Env {
    DB: D1Database;
}

type GamesPostBody = {
    winner: number;
    loser: number;
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { searchParams } = new URL(context.request.url);
    const amount = parseInt(searchParams.get('limit') ?? '20', 10); // Convert limit to number or default to 20
    const ps = context.env.DB.prepare("SELECT * FROM games ORDER BY dt DESC LIMIT ?").bind(amount);
    const { results } = await ps.all();
    return Response.json(results)
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body: GamesPostBody = await context.request.json();
        const { winner, loser } = body;
        if (winner === loser) {
            return new Response("Winner can't be the same as loser", { status: 400 });
        }
        const ps = context.env.DB.prepare("INSERT INTO games (winner, loser) VALUES (?1, ?2)").bind(winner, loser);
        const { success } = await ps.run();
        return Response.json(success)
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    try {
        const { searchParams } = new URL(context.request.url);
        const gameId = parseInt(searchParams.get('id') ?? '', 10);
        if (isNaN(gameId)) {
            return new Response("Invalid game ID", { status: 400 });
        }
        const ps = context.env.DB.prepare("DELETE FROM games WHERE id = ?1").bind(gameId);
        const { success } = await ps.run();
        return Response.json(success)
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
};

