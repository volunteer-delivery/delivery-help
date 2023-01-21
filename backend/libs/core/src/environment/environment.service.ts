import {Inject} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

export class EnvironmentService {
    @Inject()
    private configService: ConfigService;

    public getString(name: string): string {
        return this.configService.getOrThrow(name);
    }

    public getNumber(name: string): number {
        return this.configService.getOrThrow<number>(name, { infer: true });
    }
}
