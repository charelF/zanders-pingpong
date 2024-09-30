interface Env {
    DB: D1Database;
}


export const onRequestPost: PagesFunction<Env> = async (context) => {
    const id = context.params.id
    const ps = context.env.DB.prepare("INSERT INTO users (username) VALUES (?)").bind(id)
    const { success } = await ps.run()
    return Response.json(success);
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const id = context.params.id
    const ps = context.env.DB.prepare("SELECT * FROM users WHERE username = ? LIMIT 1").bind(id)
    console.log(await ps.first())
    const result = await ps.first()
    return Response.json(result);
}