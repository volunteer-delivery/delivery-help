export function formatVehicle(vehicle) {
  return {
    CAR: 'Легковушка',
    VAN: 'Грузова',
    TRUCK: 'Фура'
  }[vehicle];
}
