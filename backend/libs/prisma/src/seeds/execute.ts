import { client } from './client-provider';
import { seedUser } from './seed-user';
import { seedDrivers } from './seed-drivers';
import { seedRides } from './seed-rides';

(async (): Promise<void> => {
    const user = await seedUser();
    const drivers = await seedDrivers();
    await seedRides(user, drivers);
})()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await client.$disconnect();
    });
