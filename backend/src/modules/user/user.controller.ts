import {Controller, Get} from "@nestjs/common";
import {CurrentUser} from "../auth";
import {IUserModel} from "../database";

@Controller('user')
export class UserController {
    @Get('current')
    getCurrentUser(@CurrentUser() user: IUserModel): {user: IUserModel} {
        return {user};
    }
}
