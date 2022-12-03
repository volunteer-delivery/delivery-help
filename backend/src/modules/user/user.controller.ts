import {Controller, Get} from "@nestjs/common";
import {CurrentUser} from "../auth";
import {User} from "../prisma";

@Controller('user')
export class UserController {
    @Get('current')
    getCurrentUser(@CurrentUser() user: User): {user: User} {
        return {user};
    }
}
