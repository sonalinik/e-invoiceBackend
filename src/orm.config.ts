import { BadRequestException } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const mssql = require('mssql');
class DBConnection {
  async getConnection(data) {
    try {

      if (data.CODE == '') {
        return await mssql.connect({
          user: 'sa',
          host: 'localhost',
          password: '',
          server: 'localhost',
          database: 'BWAYSEFSERPUSERS',
          requestTimeout: 300000,
          options: {

            encrypt: false,

          },
          pool: {
            max: 100,
            min: 0,
            idleTimeoutMillis: 3600000,

          },
        });
      } else {
        return await mssql.connect({
          user: 'sa',
          host: 'localhost',
          password: '',
          server: 'localhost',
          database: data.DBNAME,
          requestTimeout: 300000
          ,
          options: {

            encrypt: false,

          },
          pool: {
            max: 100,
            min: 0,
            idleTimeoutMillis: 3600000,

          },
        });
      }


    }
    catch (error) {
      console.log("err", error);
    }
  }
  async getConnectionDefault() {
    try {

      return await mssql.connect({
        user: 'sa',
        host: 'localhost',
        password: '',
        server: 'localhost',
        database: 'BWAYSEFSERP100',
        requestTimeout: 300000,
        options: {
          encrypt: false,
        },
        pool: {
          max: 100,
          min: 0,
          idleTimeoutMillis: 3600000,
        },
      });
    }
    catch (error) {
      console.log("err", error);
    }
  }

  async getUserDatabaseConnection(name) {

    try {
      switch (name.toUpperCase()) {
        case name.toUpperCase():
          return await mssql.connect({
            user: 'sa',
            host: 'localhost',
            password: '',
            server: 'localhost',
            database: 'BWAYSEFSERPUSERS',
            requestTimeout: 300000,
            options: {
              encrypt: false,
            },
            pool: {
              max: 100,
              min: 0,
              idleTimeoutMillis: 3600000,
            },
          })
          break;
        default:
          throw new BadRequestException('No Database Case Defined for: ' + name)
      }
    } catch (ex) {
      throw new BadRequestException(ex.Message)
    } finally {
      // release()
    }
  }
}
module.exports = new DBConnection();

