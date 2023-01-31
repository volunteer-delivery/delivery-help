import {Vehicle} from "~/enums";

export const formatVehicle = (vehicle: Vehicle)  => ({
    CAR: 'Легковушка',
    VAN: 'Грузова',
    TRUCK: 'Фура'
})[vehicle];

export const formatVehicleDetails = (vehicle: Vehicle)  => ({
    CAR: '( < 2т)',
    VAN: '( < 10т)',
    TRUCK: '( > 10т)'
})[vehicle];
