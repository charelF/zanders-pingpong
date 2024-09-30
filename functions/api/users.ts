interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const ps = context.env.DB.prepare("SELECT * from users");
    const { results } = await ps.all()
    return Response.json(results);
}