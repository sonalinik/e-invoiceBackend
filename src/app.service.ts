import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SqlClient } from 'msnodesqlv8'
import { Repository } from 'typeorm';

 const sql = require("msnodesqlv8")




@Injectable()

export class AppService {

  constructor(
    ) { }



  async getHello() {



  }

 

}
