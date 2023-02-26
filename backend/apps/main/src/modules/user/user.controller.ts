import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { User } from '@app/prisma';
import { CurrentUser } from '../auth';
import { CurrentUserResponse } from './dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    @Get('current')
    public getCurrentUser(@CurrentUser() user: User): CurrentUserResponse {
        return new CurrentUserResponse(user);
    }
}
