import { Vehicle } from '~/enums';

export const formatVehicle = (vehicle: Vehicle): string => ({
    CAR: 'Легковушка',
    VAN: 'Грузова',
    TRUCK: 'Фура',
})[vehicle];

export const formatVehicleDetails = (vehicle: Vehicle): string => ({
    CAR: 'Легковушка ( < 2т )',
    VAN: 'Грузова ( < 10т )',
    TRUCK: 'Фура ( > 10т )',
})[vehicle];
