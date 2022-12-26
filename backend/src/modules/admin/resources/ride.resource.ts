import {AdminResource} from "./admin-resource";
import {Injectable} from "@nestjs/common";
import {Prisma} from "../../prisma";
import {RecordJSON, ResourceOptions} from "adminjs";

@Injectable()
export class RideResource extends AdminResource {
    protected model: Prisma.ModelName = 'Ride';

    protected options: ResourceOptions = {
        properties: {
            id: {
                position: 1,
                isId: true,
                type: 'uuid',
                isVisible: {
                    show: true
                }
            },
            driver: {
                position: 2,
                type: 'reference'
            },
            from: {
                position: 3,
                type: 'reference',
                isVisible: {
                    list: true,
                    show: true
                }
            },
            destination: {
                position: 4,
                type: 'reference',
                isVisible: {
                    list: true,
                    show: true
                }
            },
            departureTime: {
                position: 5,
                type: 'date'
            },
            status: {
                position: 6,
                type: 'string'
            },
            vehicle: {
                position: 7,
                type: 'string'
            },
            volunteer: {
                position: 8,
                type: 'reference',
                isVisible: {
                    show: true,
                    filter: true,
                    edit: true
                }
            }
        },
        navigation: {
            icon: 'DeliveryTruck'
        },
        actions: {
            list: {
                after: (response) => {
                    for (const record of response.records) {
                        this.formatRecord(record);
                    }
                    return response;
                }
            },
            show: {
                after: (response) => {
                    this.formatRecord(response.record);
                    return response;
                }
            },
            new: {
                isVisible: false
            }
        }
    }

    private formatRecord(record: RecordJSON) {
        const { from } = record.populated;
        from.title = from.params.city || from.params.country;
    }
}
