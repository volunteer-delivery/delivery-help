import { Driver, Ride, User, RideStatus, Vehicle } from '../client';
import { client } from './client-provider';

function randomDate(): Date {
    const start = new Date();
    const end = new Date();
    end.setMonth(start.getMonth() + 3);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const rides = [
    {
        status: RideStatus.PENDING,
        from: { country: 'Україна', city: 'Черкаси' },
        destination: { country: 'Україна', city: 'Чернівці' },
        vehicle: Vehicle.CAR,
    },
    {
        status: RideStatus.ACTIVE,
        from: { country: 'Польща' },
        destination: { country: 'Україна', city: 'Львів' },
        vehicle: Vehicle.VAN,
    },
    {
        status: RideStatus.FINISHED,
        from: { country: 'Україна', city: 'Київ' },
        destination: { country: 'Україна', city: 'Дніпро' },
        vehicle: Vehicle.TRUCK,
    },
    {
        status: RideStatus.PENDING,
        from: { country: 'Австралія' },
        destination: { country: 'Україна', city: 'Одеса' },
        vehicle: Vehicle.CAR,
    },
    {
        status: RideStatus.PENDING,
        from: { country: 'Україна', city: 'Запоріжжя' },
        destination: { country: 'Україна', city: 'Луцьк' },
        vehicle: Vehicle.CAR,
    },
    {
        status: RideStatus.PENDING,
        from: { country: 'Україна', city: 'Житомир' },
        destination: { country: 'Україна', city: 'Харьків' },
        vehicle: Vehicle.CAR,
    },
    {
        status: RideStatus.PENDING,
        from: { country: 'Україна', city: 'Полтава' },
        destination: { country: 'Україна', city: 'Суми' },
        vehicle: Vehicle.CAR,
    },
];

export function seedRides(user: User, drivers: Driver[]): Promise<Ride[]> {
    return client.$transaction(rides.map((ride, index) => {
        const volunteer = RideStatus.PENDING === ride.status ? null : user.id;

        return client.ride.create({
            data: {
                departureTime: randomDate(),
                vehicle: ride.vehicle,
                status: ride.status,
                driver: {
                    connect: {
                        id: drivers[index].id,
                    },
                },
                from: {
                    create: ride.from,
                },
                destination: {
                    create: ride.destination,
                },
                volunteer: !volunteer ? undefined : {
                    connect: { id: volunteer },
                },
            },
        });
    }));
}
