const { driverModel, rideModel } = require('./models');

const driverList = [
    {
        name: "Петро",
        phone: "+38005553535",
        grade: 'NOT VERIFIED',
    },
    {
        name: "Ніколай Сергійович",
        phone: "+38014322883",
        grade: 'VERIFIED',
    },
    {
        name: "Олексій Миколайович",
        phone: "+38014321424",
        grade: 'VERIFIED',
    }
];

const fromList = [
    {"country": "Україна", "city": "Черкаси"},
    {"country": "Польща"},
    {"country": "Україна", "city": "Київ"}
];
const destinationList = [
    {"country": "Україна", "city": "Чернівці"},
    {"country": "Україна", "city": "Львів"},
    {"country": "Україна", "city": "Дніпро"}
];
const timeList = ['2022-04-22', '2022-05-01', '2022-04-26'];
const vehicleList = ['CAR', 'VAN', 'TRUCK'];
const statusList = ['PENDING', 'ACTIVE', 'FINISHED'];

async function seedData() {
    const drivers = await driverModel.insertMany(driverList);
    await drivers.map((driver, i) => rideModel.create({
        driver: driver._id,
        from: fromList[i],
        destination: destinationList[i],
        departureTime: timeList[i],
        vehicle: vehicleList[i],
        status: statusList[i]
    }));
}

module.exports = { seedData };
