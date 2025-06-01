
import { setDbAndFirstUser } from "./MongodbSeeder";
import { setDb } from "./PostgresSeeder";

async function main() {
    await setDbAndFirstUser();
    await setDb();
}

main();