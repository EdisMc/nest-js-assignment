import { BaseController } from 'src/shared/controller/base.controller';

import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.schema';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth('Authorization')
@Controller('users')
export class UserController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  override create(@Body() dto: CreateUserDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  override update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return super.update(id, dto);
  }

  @Delete(':id/soft')
  override softDelete(@Param('id') id: string) {
    return super.softDelete(id);
  }

  @Delete(':id/hard')
  override hardDelete(@Param('id') id: string) {
    return super.hardDelete(id);
  }
  @Get('by-email')
  async getByEmail(@Query('email') email: string) {
    return this.userService.getByEmail(email);
  }
}
