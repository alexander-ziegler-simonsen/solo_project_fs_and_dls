
import { setDbAndFirstUser } from "./MongodbSeeder";

async function main() {
    await setDbAndFirstUser();
}

main();