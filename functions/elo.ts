interface Env {}

import type { Ranking } from "../src/models.ts";

export const onRequest: PagesFunction<Env> = async (context) => {
    console.log(1)
    const ranking: Ranking = {
        username: "charel",
        score: 1234,
        winpct: 1
    };
    return new Response(JSON.stringify(ranking), { headers: { "Content-Type": "application/json" } });
};
