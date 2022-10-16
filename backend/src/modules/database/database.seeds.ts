import {Inject, Injectable} from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import {
    DriverRepository, IDriverModel,
    IRideModel,
    IUserModel,
    RideRepository,
    RideStatus,
    UserRepository,
    Vehicle
} from "./repository";

const userData = {
    name: 'beta',
    _password: bcrypt.hashSync('password', 10)
};

const driverList = [
    {name: 'Петро', phone: '+38005553535', grade: 'NOT VERIFIED'},
    {name: 'Ніколай Сергійович', phone: '+38014322883', grade: 'VERIFIED'},
    {name: 'Олексій Миколайович', phone: '+38014321424', grade: 'VERIFIED'},
    {name: 'Олена', phone: '+38032522235', grade: 'NOT VERIFIED'},
    {name: 'Максим ', phone: '+38098322662', grade: 'NOT VERIFIED'},
    {name: 'Слава', phone: '+380148628285', grade: 'VERIFIED'},
    {name: 'Анатолій', phone: '+38077332173', grade: 'VERIFIED'}
];

const rideList = [
    {
        status: RideStatus.PENDING,
        from: {country: 'Україна', city: 'Черкаси'},
        destination: {country: 'Україна', city: 'Чернівці'},
        departureTime: '2022-04-22',
        vehicle: Vehicle.CAR
    },
    {
        status: RideStatus.ACTIVE,
        from: {country: 'Польща'},
        destination: {country: 'Україна', city: 'Львів'},
        departureTime: '2022-05-01',
        vehicle: Vehicle.VAN
    },
    {
        status: RideStatus.FINISHED,
        from: {country: 'Україна', city: 'Київ'},
        destination: {country: 'Україна', city: 'Дніпро'},
        departureTime: '2022-04-26',
        vehicle: Vehicle.TRUCK
    },
    {
        status: RideStatus.PENDING,
        from: {country: 'Австралія'},
        destination: {country: 'Україна', city: 'Одеса'},
        departureTime: '2022-05-03',
        vehicle: Vehicle.CAR
    },
    {
        status: RideStatus.PENDING,
        from: {country: 'Україна', city: 'Запоріжжя'},
        destination: {country: 'Україна', city: 'Луцьк'},
        departureTime: '2022-04-20',
        vehicle: Vehicle.CAR
    },
    {
        status: RideStatus.PENDING,
        from: {country: 'Україна', city: 'Житомир'},
        destination: {country: 'Україна', city: 'Харьків'},
        departureTime: '2022-04-22',
        vehicle: Vehicle.CAR
    },
    {
        status: RideStatus.PENDING,
        from: {country: 'Україна', city: 'Полтава'},
        destination: {country: 'Україна', city: 'Суми'},
        departureTime: '2022-05-05',
        vehicle: Vehicle.CAR
    }
];

@Injectable()
export class DatabaseSeeds {
    @Inject()
    private userRepository: UserRepository;

    @Inject()
    private driverRepository: DriverRepository;

    @Inject()
    private rideRepository: RideRepository;

    async execute(): Promise<void> {
        const user = await this.createUser();
        const drivers = await this.createDrivers();
        await this.createRides(user, drivers);
    }

    private createUser(): Promise<IUserModel> {
        return this.userRepository.query.create(userData);
    }

    private createDrivers(): Promise<IDriverModel[]> {
        return this.driverRepository.query.insertMany(driverList);
    }

    private createRides(user: IUserModel, drivers: IDriverModel[]): Promise<IRideModel[]> {
        return this.rideRepository.query.insertMany(rideList.map((data, index) => {
            const volunteer = [RideStatus.ACTIVE, RideStatus.FINISHED].includes(data.status) ? user.id : null;

            return {
                driver: drivers[index].id,
                from: data.from,
                destination: data.destination,
                departureTime: data.departureTime,
                vehicle: data.vehicle,
                status: data.status,
                volunteer
            };
        }));
    }
}