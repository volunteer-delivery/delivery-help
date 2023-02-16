import { Driver, Ride, User, RideStatus, Vehicle } from '../client';
import { client } from './client-provider';

const rides = [
    {
        status: RideStatus.PENDING,
        from: { country: 'Україна', city: 'Черкаси' },
        destination: { country: 'Україна', city: 'Чернівці' },
        departureTime: '2022-04-22',
        vehicle: Vehicle.CAR,
    },
    {
        status: RideStatus.ACTIVE,
        from: { country: 'Польща' },
        destination: { country: 'Україна', city: 'Львів' },
        departureTime: '2022-05-01',
        vehicle: Vehicle.VAN,
    },
    {
        status: RideStatus.FINISHED,
        from: { country: 'Україна', city: 'Київ' },
        destination: { country: 'Україна', city: 'Дніпро' },
        departureTime: '2022-04-26',
        vehicle: Vehicle.TRUCK,
    },
    {
        status: RideStatus.PENDING,
        from: { country: 'Австралія' },
        destination: { country: 'Україна', city: 'Одеса' },
        departureTime: '2022-05-03',
        vehicle: Vehicle.CAR,
    },
    {
        status: RideStatus.PENDING,
        from: { country: 'Україна', city: 'Запоріжжя' },
        destination: { country: 'Україна', city: 'Луцьк' },
        departureTime: '2022-04-20',
        vehicle: Vehicle.CAR,
    },
    {
        status: RideStatus.PENDING,
        from: { country: 'Україна', city: 'Житомир' },
        destination: { country: 'Україна', city: 'Харьків' },
        departureTime: '2022-04-22',
        vehicle: Vehicle.CAR,
    },
    {
        status: RideStatus.PENDING,
        from: { country: 'Україна', city: 'Полтава' },
        destination: { country: 'Україна', city: 'Суми' },
        departureTime: '2022-05-05',
        vehicle: Vehicle.CAR,
    },
];

export function seedRides(user: User, drivers: Driver[]): Promise<Ride[]> {
    return client.$transaction(rides.map((ride, index) => {
        const volunteer = RideStatus.PENDING === ride.status ? null : user.id;

        return client.ride.create({
            data: {
                departureTime: new Date(ride.departureTime),
                vehicle: ride.vehicle,
                status: ride.status,
                driver: {
                    connect: { id: drivers[index].id },
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
