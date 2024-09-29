interface Env {}

import type { Ranking, Game } from "../src/models.ts";


export const onRequest: PagesFunction<Env> = async (context) => {
    console.log(1)
    const rankings: Ranking[] = [{
        username: "charel",
        score: 1234
    }]
    return new Response(JSON.stringify(rankings), { headers: { "Content-Type": "application/json" } });
};
