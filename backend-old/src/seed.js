const bcrypt = require('bcryptjs');
const { driverModel, rideModel, userModel, rideStatusEnum} = require('./models');

const userData = {
    name: 'beta',
    _password: bcrypt.hashSync('password', 10)
};

const driverList = [
    {
        name: 'Петро',
        phone: '+38005553535',
        grade: 'NOT VERIFIED',
    },
    {
        name: 'Ніколай Сергійович',
        phone: '+38014322883',
        grade: 'VERIFIED',
    },
    {
        name: 'Олексій Миколайович',
        phone: '+38014321424',
        grade: 'VERIFIED',
    },
    {
        name: 'Олена',
        phone: '+38032522235',
        grade: 'NOT VERIFIED',
    },
    {
        name: 'Максим ',
        phone: '+38098322662',
        grade: 'NOT VERIFIED',
    },
    {
        name: 'Слава',
        phone: '+380148628285',
        grade: 'VERIFIED',
    },
    {
        name: 'Анатолій',
        phone: '+38077332173',
        grade: 'VERIFIED',
    }
];

const fromList = [
    {'country': 'Україна', 'city': 'Черкаси'},
    {'country': 'Польща'},
    {'country': 'Україна', 'city': 'Київ'},
    {'country': 'Австралія'},
    {'country': 'Україна', 'city': 'Запоріжжя'},
    {'country': 'Україна', 'city': 'Житомир'},
    {'country': 'Україна', 'city': 'Полтава'},
];
const destinationList = [
    {'country': 'Україна', 'city': 'Чернівці'},
    {'country': 'Україна', 'city': 'Львів'},
    {'country': 'Україна', 'city': 'Дніпро'},
    {'country': 'Україна', 'city': 'Одеса'},
    {'country': 'Україна', 'city': 'Луцьк'},
    {'country': 'Україна', 'city': 'Харьків'},
    {'country': 'Україна', 'city': 'Суми'}
];
const timeList = ['2022-04-22', '2022-05-01', '2022-04-26', '2022-05-03', '2022-04-20', '2022-04-22', '2022-05-05' ];
const vehicleList = ['CAR', 'VAN', 'TRUCK', 'CAR', 'CAR', 'CAR', 'CAR' ];
const statusList = ['PENDING', 'ACTIVE', 'FINISHED', 'PENDING', 'PENDING', 'PENDING', 'PENDING'];

async function seedData() {
    const user = await userModel.create(userData);
    const drivers = await driverModel.insertMany(driverList);

    await Promise.all(drivers.map((driver, i) => {
        const status = statusList[i];
        const volunteer = [rideStatusEnum.active, rideStatusEnum.finished].includes(status) ? user._id : null;

        return rideModel.create({
            driver: driver._id,
            from: fromList[i],
            destination: destinationList[i],
            departureTime: timeList[i],
            vehicle: vehicleList[i],
            status,
            volunteer
        })
    }));
}

function getRandomElem(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

function getRandomDriver() {
    return {
        name: getRandomElem(['Слава', 'Ніколай', 'Максим', 'Олег', 'Олена', 'Сергій', 'Марія']),
        phone: `+380${Math.floor(1000000 + Math.random() * 9000000)}`,
        grade: getRandomElem(['NOT VERIFIED', 'VERIFIED'])
    }
}

function getRandomRides() {
    return {
        from: getRandomElem(fromList),
        destination: getRandomElem(destinationList),
        departureTime: getRandomElem(timeList),
        vehicle: getRandomElem(['CAR', 'VAN', 'TRUCK']),
        status: 'PENDING'
    }
}

module.exports = { seedData, getRandomDriver, getRandomRides };
