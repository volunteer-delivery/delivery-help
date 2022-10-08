import {DynamicModule} from "@nestjs/common";
import {EventsGateway} from "./events.gateway";

export class EventsModule {
    static forRoot = (): DynamicModule => ({
        global: true,
        module: EventsModule,
        providers: [EventsGateway],
        exports: [EventsGateway]
    });
}
