import { Controller, Post, Body, Get } from '@nestjs/common';
import { LoginService } from './login.service'

@Controller('login')
export class LoginController {

  constructor(private readonly appService: LoginService) { }

  @Post()
  async login(@Body() data) {
    return await this.appService.login(data);
  }

  @Post('/get')
  async get(@Body() data) {
    return await this.appService.get(data);
  }

  @Post('/master/testing')
  async gettesting(@Body() data) {
    return await this.appService.gettesting(data)
  }

  @Get('/length')
  async getlength() {
    return await this.appService.getlength();
  }

  @Post('/insert/testing')
  async getinserttesting(@Body() data) {
    return await this.appService.getinserttesting(data)
  }
  @Post('/door/insert/testing')
  async getinsertDoortesting(@Body() data) {
    return await this.appService.getinsertDoortesting(data)
  }

  @Post('/update/testing')
  async getupdatetesting(@Body() data) {
    return await this.appService.getupdatetesting(data)
  }

  @Post('/existing/testing')
  async getExistingtesting(@Body() data) {
    return await this.appService.getExistingtesting(data)
  }

  // @Get('/report')
  // async getreport() {
  //   return await this.appService.getreport();
  // }

}
