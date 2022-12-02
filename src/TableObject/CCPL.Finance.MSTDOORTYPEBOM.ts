import { BadRequestException } from "@nestjs/common"
// import { release } from "os"

class MSTDOORTYPEBOM {

    public TABLE_MSTDOORTYPEBOM = "MSTDOORTYPEBOM"

    public SP_INS_MSTDOORTYPEBOM = "Ins_MSTDOORTYPEBOM"

    public DOOR_TYPE = "intDoorType"
    public SR_NO = "intSrNo"
    public REF_MATCODE = "intRefMatCode"
    public QTY = "decQty"
    public SYSADD_DATETIME = "chrSysAddDateTime"
    public SYSADD_LOGIN = "chrSysAddLogin"
    public STATUS_CODE = "intStatusCode"
   

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

                case this.SP_INS_MSTDOORTYPEBOM.toUpperCase():
                    this.dt['DOOR_TYPE'] = this.DOOR_TYPE
                    this.dt['SR_NO'] = this.SR_NO
                    this.dt['REF_MATCODE'] = this.REF_MATCODE
                    this.dt['QTY'] = this.QTY
                    this.dt['SYSADD_DATETIME'] = this.SYSADD_DATETIME
                    this.dt['SYSADD_LOGIN'] = this.SYSADD_LOGIN
                    this.dt['STATUS_CODE'] = this.STATUS_CODE

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
module.exports = new MSTDOORTYPEBOM();