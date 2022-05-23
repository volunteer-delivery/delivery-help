export const formatVehicle = (vehicle)  => ({
    CAR: 'Легковушка',
    VAN: 'Грузова',
    TRUCK: 'Фура'
})[vehicle];

export const formatVehicleDetails = (vehicle)  => ({
    CAR: '( < 2т)',
    VAN: '( < 10т)',
    TRUCK: '( > 10т)'
})[vehicle];
