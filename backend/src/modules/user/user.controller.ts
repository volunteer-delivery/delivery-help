import {ClassSerializerInterceptor, Controller, Get, UseInterceptors} from "@nestjs/common";
import {CurrentUser} from "../auth";
import {User} from "../prisma";
import {CurrentUserResponse} from "./dto";

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    @Get('current')
    getCurrentUser(@CurrentUser() user: User): CurrentUserResponse {
        return new CurrentUserResponse(user);
    }
}
