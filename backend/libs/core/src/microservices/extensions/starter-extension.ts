import {INestApplicationContext} from "@nestjs/common";

export abstract class StarterExtension<App extends INestApplicationContext> {
    public app: App
    public beforeStart(): Promise<void> | void {}
}
