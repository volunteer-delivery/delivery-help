import {Vehicle} from "~/enums";

export const formatVehicle = (vehicle: Vehicle)  => ({
    CAR: 'Легковушка',
    VAN: 'Грузова',
    TRUCK: 'Фура'
})[vehicle];

export const formatVehicleDetails = (vehicle: Vehicle) => ({
    CAR: 'Легковушка ( < 2т )',
    VAN: 'Грузова ( < 10т )',
    TRUCK: 'Фура ( > 10т )'
})[vehicle];
