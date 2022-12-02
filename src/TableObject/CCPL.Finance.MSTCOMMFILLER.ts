import { BadRequestException } from "@nestjs/common"
// import { release } from "os"

class MSTCOMMFILLER {

    public TABLE_MSTCOMMFILLER = "MSTCOMMFILLER"
    public RAW_DATA_COLUMNS = "*"
    public RAW_DATA_WHERE_CLAUSE = ""
    public HELP_DATA_COLUMNS = " CODE, NAME "
    public HELP_DATA_COMPID_COLUMN = " CODE"
    public HELP_DATA_WHERE_CLAUSE = ""
    public SORT_ORDER_CODE = " CODE "
    public SORT_ORDER_NAME = " NAME "

    public SP_GET_MSTCOMMFILLER = "Sel_MasterCodeList"
    public SP_INS_MSTCOMMFILLER = "Ins_MSTCOMMFILLER"
    public SP_EXISTING_MSTCOMMFILLER = "Sel_ExistingMasterProjects"

    public CODE = "intCODE"
    public NAME = "chrName"
    public COMPANY_ID = "chrCompanyId"
    public SYSADD_DATETIME = "chrSysAddDateTime"
    public SYSADD_LOGIN = "chrSysAddLogin"
    public SYSCHNG_DATETIME = "chrSysChngDateTime"
    public SYSCHNG_LOGIN = "chrSysChngLogin"
    public STATUS_CODE = "intStatusCode"
    public HelpColumnFilter = "chrHelpColumnFilter"

    GetSchema(StoredProcName) {
        let Parms = []
        try {
            Parms = this.GetDataSet(StoredProcName)
        } catch (ex) {
            throw new BadRequestException(ex.Message)
        } finally {
            // release()
        }
        return Parms
    }


    ds = new Array()
    dt = {}
    GetDataSet(StoredProcName: String, TranNo?: object, SystDateTime?: object, UserLogin?: object, StatusCode?: object) {
        this.ds = []
        this.dt = {}

        try {
            switch (StoredProcName.toUpperCase()) {
                case this.SP_GET_MSTCOMMFILLER.toUpperCase():
                    this.dt['CODE'] = this.CODE
                    this.dt['HelpColumnFilter'] = this.HelpColumnFilter
                    this.dt['COMPANY_ID'] = this.COMPANY_ID
                    break;
                case this.SP_INS_MSTCOMMFILLER.toUpperCase():
                    this.dt['CODE'] = this.CODE
                    this.dt['NAME'] = this.NAME
                    this.dt['SYSADD_DATETIME'] = this.SYSADD_DATETIME
                    this.dt['SYSADD_LOGIN'] = this.SYSADD_LOGIN
                    this.dt['SYSCHNG_DATETIME'] = this.SYSCHNG_DATETIME
                    this.dt['SYSCHNG_LOGIN'] = this.SYSCHNG_LOGIN
                    this.dt['STATUS_CODE'] = this.STATUS_CODE

                    break;
                case this.SP_EXISTING_MSTCOMMFILLER.toUpperCase():
                    this.dt['CODE'] = this.CODE

                    break;
                default:
                    throw new BadRequestException('No DataSet Case Defined for Stored Procedure : ' + StoredProcName)
            }

            this.ds.push(this.dt)

        } catch (ex) {
            throw new BadRequestException(ex.Message)
        } finally {
        }

        return this.ds
    }





}
module.exports = new MSTCOMMFILLER();