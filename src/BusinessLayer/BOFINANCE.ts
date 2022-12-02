import { BadRequestException } from "@nestjs/common"
import { Connection } from "typeorm";
// import { release } from '../data/getData'
const mssqlcon = require('../orm.config');
const mssqlsubcon = require('../orm.subconfig');
const mssqlparameters = require('../parameters');
const tableobj = require('../TableObject/CCPL.Finance.MSTCOMMFILLER');
const taobj = require('../TableObject/CCPL.Finance.MSTDOORTYPEBOM');

const spdata = require('../data/getData');
const replace = require('../data/replaceColumns');
const insert = require('../data/insertMultiple');


class BOFinance {
    private connection: Connection

    async MastDataList(CompanyID: String, VoucherType: number, HelpColumnFilter?: string) {
        const conn = await mssqlcon.getUserDatabaseConnection('USERDATABASE');
        try {
            const subconn = await mssqlsubcon.getConnection(CompanyID, conn);
            let Parms = new Array()
            let Parm = new Array()
            try {
                let ds = new Array()
                Parms = tableobj.GetSchema(tableobj.SP_GET_MSTCOMMFILLER)
                Parm[Parms[0].CODE] = VoucherType
                Parm[Parms[0].HelpColumnFilter] = HelpColumnFilter
                Parm[Parms[0].COMPANY_ID] = CompanyID
                ds.push(await spdata.GetSPData(tableobj.SP_GET_MSTCOMMFILLER, Parm, subconn))
                return ds
            } catch (ex) {
                throw new BadRequestException('No Case Defined')
            } finally {
                Parms = []
                conn.close()
                subconn.close()
            }
        } catch (ex) {
            throw new BadRequestException(ex.Message)
        } finally {
            conn.close()
            // release()
        }

    }

    async insert(DSMaster, CompanyID) {
        let transaction
        let MasterCode
        let MaxLength = 3
        let SysDateTime
        let SysLogin
        let RplVal = {}
        let newArr = new Array()
        const conn = await mssqlcon.getUserDatabaseConnection('USERDATABASE');
        try {
            const subconn = await mssqlsubcon.getConnection(CompanyID, conn);
            // await subconn.begin();
            try {
                MasterCode = await subconn.request().query(`Get_Next_Master_Code  @Company_id='', @Table_name='${tableobj.TABLE_MSTCOMMFILLER}', @Code_Colum='CODE', @Code_Len=${MaxLength}, @Code_Prefix=0`);
                SysDateTime = await subconn.request().query(`Get_SysDateTime`)
                RplVal = {
                    [tableobj.CODE]: MasterCode['recordset'][0][''],
                    [tableobj.SYSADD_DATETIME]: SysDateTime['recordset'][0][''],
                    [tableobj.SYSCHNG_DATETIME]: SysDateTime['recordset'][0]['']
                }

                let data = await replace.replaceColumns(DSMaster, RplVal)

                await insert.insertMultiples(tableobj.SP_INS_MSTCOMMFILLER, data, subconn)
                // await subconn.commit();

            } catch (ex) {
                // await subconn.rollback();

                throw new BadRequestException('No Case Defined')
            } finally {
                conn.close()
                subconn.close()
            }
        } catch (ex) {
            throw new BadRequestException(ex.Message)
        } finally {
            conn.close()
        }

        return MasterCode['recordset'][0]['']
    }

    async update(DSMaster, CompanyID) {
        let transaction
        let MasterCode
        let MaxLength = 3
        let SysDateTime
        let SysLogin
        let RplVal = {}
        let newArr = new Array()
        const conn = await mssqlcon.getUserDatabaseConnection('USERDATABASE');
        try {
            const subconn = await mssqlsubcon.getConnection(CompanyID, conn);
            try {
                SysDateTime = await subconn.request().query(`Get_SysDateTime`)
                RplVal = {
                    [tableobj.SYSCHNG_DATETIME]: SysDateTime['recordset'][0]['']
                }

                let data = await replace.replaceColumns(DSMaster, RplVal)
                await insert.delete(tableobj.TABLE_MSTCOMMFILLER, DSMaster[0]['intCODE'], subconn)
                await insert.insertMultiples(tableobj.SP_INS_MSTCOMMFILLER, data, subconn)
            } catch (ex) {
                throw new BadRequestException('No Case Defined')
            } finally {
                conn.close()
                subconn.close()
            }
        } catch (ex) {
            throw new BadRequestException(ex.Message)
        } finally {
            conn.close()
        }

        return DSMaster[0]['intCODE']
    }

    async getExisting(CompanyID: String, Code: number){
        const conn = await mssqlcon.getUserDatabaseConnection('USERDATABASE');
        try {
            const subconn = await mssqlsubcon.getConnection(CompanyID, conn);
            let Parms = new Array()
            let Parm = new Array()
            try {
                let ds = new Array()
                Parms = tableobj.GetSchema(tableobj.SP_EXISTING_MSTCOMMFILLER)
                Parm[Parms[0].CODE] = Code
              
                ds.push(await spdata.GetSPData(tableobj.SP_EXISTING_MSTCOMMFILLER, Parm, subconn))
                return ds
            } catch (ex) {
                throw new BadRequestException('No Case Defined')
            } finally {
                Parms = []
                conn.close()
                subconn.close()
            }
        } catch (ex) {
            throw new BadRequestException(ex.Message)
        } finally {
            conn.close()
            // release()
        }
    }


    async Doorinsert(DSMaster, CompanyID) {
        let transaction
        let MasterCode
        let MaxLength = 3
        let SysDateTime
        let SysLogin
        let RplVal = {}
        let newArr = new Array()
        const conn = await mssqlcon.getUserDatabaseConnection('USERDATABASE');
        try {
            const subconn = await mssqlsubcon.getConnection(CompanyID, conn);
            try {
                SysDateTime = await subconn.request().query(`Get_SysDateTime`)
                RplVal = {
                    [taobj.SYSADD_DATETIME]: SysDateTime['recordset'][0][''],
                }

                let data = await replace.replaceColumns(DSMaster, RplVal)

                await insert.insertMultiples(taobj.SP_INS_MSTDOORTYPEBOM, data, subconn)
            } catch (ex) {
                throw new BadRequestException('No Case Defined')
            } finally {
                conn.close()
                subconn.close()
            }
        } catch (ex) {
            throw new BadRequestException(ex.Message)
        } finally {
            conn.close()
        }

        // return MasterCode['recordset'][0]['']
    }



}
module.exports = new BOFinance();