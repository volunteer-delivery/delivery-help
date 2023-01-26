import {Driver} from "../client";
import {client} from "./client-provider";

const drivers = [
    {name: 'Петро', phone: '+38005553535'},
    {name: 'Ніколай Сергійович', phone: '+38014322883'},
    {name: 'Олексій Миколайович', phone: '+38014321424'},
    {name: 'Олена', phone: '+38032522235'},
    {name: 'Максим ', phone: '+38098322662'},
    {name: 'Слава', phone: '+380148628285'},
    {name: 'Анатолій', phone: '+38077332173'}
]

export function seedDrivers(): Promise<Driver[]> {
    return client.$transaction(drivers.map((driver) => {
        return client.driver.create({ data: driver })
    }))
}
