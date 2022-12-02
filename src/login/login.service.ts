import { Injectable } from '@nestjs/common';
// import { Injectable } from '../lib';
const mssqlcon = require('../orm.config');
const mssqlbo = require('../BusinessLayer/BOFINANCE');
const sp = require('../SpGenerate/filler');
const spd = require('../SpGenerate/doorType');

// var { ReportManager } = require('mssql-ssrs');

// var ssrs = new ReportManager([cacheReports]);

// var rfdc = require('rfdc')

@Injectable()
export class LoginService {
    constructor() { }

    async login(data) {
        let conn
        let summary
        try {
            conn = await mssqlcon.getConnection(data);
            let result = await this.loginreq(data)
            return result

        } catch (err) {
            console.log(err)
            let result = await this.loginreq(data)
            return result
        } finally {
            conn.close()
        }
    }

    async loginreq(data) {
        const conn = await mssqlcon.getConnection(data);
        const result = await conn.request().query(`Sel_GetUserInfo  @chrCompanyID='101', @chrUserID=${data.username}, @intLoginIdentity=0`);
        let summary = {
            Details: result.recordsets[0],
        };
        conn.close()

        return summary
    }


    async get(data) {
        const conn = await mssqlcon.getConnectionDefault();
        const result = await conn.request().query(`SELECT * FROM CNFMASTTYPES WHERE CODE = ${data.tranType}`);
        conn.close()
        return result.recordsets
    }

    async gettesting(data) {
        let result = await mssqlbo.MastDataList(data.CODE, data.tranType, data.filter)
        return result

    }

    // fetching data-type and length with column-name from  MSTCOMMFILLER table - validation for length of column
    async getlength() {

        const conn = await mssqlcon.getConnectionDefault();
        const result = await conn.request().query(`SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'MSTCOMMFILLER'`);
        conn.close()
        return result.recordsets
    }

    async getinserttesting(data) {

        let res = await sp.Filler(data)
        let result = await mssqlbo.insert(res, data.COMPANY_ID)
        return result

    }

    async getExistingtesting(data) {

        let result = await mssqlbo.getExisting(data.COMPANY_ID, data.CODE)
        return result

    }

    async getupdatetesting(data) {

        let res = await sp.Filler(data)

        let result = await mssqlbo.update(res, data.COMPANY_ID)
        return result

    }

    async getinsertDoortesting(data) {

        let res = await spd.Filler(data.multiField)
        let result = await mssqlbo.Doorinsert(res, data.COMPANY_ID)
        return result

    }

    // async getreport() {
    //     rfdc ({ report: 'C:/Users/DESKTOP/source/repos/New Sample Report/New Sample Report/Report2.rdl' }, function (err, result) {
    //         if (!!err) throw err;
    //         var fs = require('fs')
    //         fs.writeFileSync('test.pdf', result)
    //     })
    //     // return window.open('http://localhost/ReportServer/Pages/ReportViewer.aspx?%2fNew+Sample+Report%2fReport1&rs:Command=Render', '_blank');
    // }



}
