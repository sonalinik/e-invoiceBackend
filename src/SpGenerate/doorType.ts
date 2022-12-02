const taobj = require('../TableObject/CCPL.Finance.MSTDOORTYPEBOM');

class DoorType {
    async Filler(data) {

        let Parms = new Array()
        let tempParms = new Array()
        let Parm = {}
        Parms = taobj.GetSchema(taobj.SP_INS_MSTDOORTYPEBOM)
        for (let i = 0; i <= data.length - 1; i++) {
            let Parm = {}
            Parm[Parms[0].DOOR_TYPE] = (((data[i].DOOR_TYPE == null) || (data[i].DOOR_TYPE == undefined)) ? 0 : data[i].DOOR_TYPE)
            Parm[Parms[0].SR_NO] = (((data[i].SR_NO == null) || (data[i].SR_NO == undefined)) ? 0 : data[i].SR_NO)
            Parm[Parms[0].REF_MATCODE] = (((data[i].REF_MATCODE == null) || (data[i].REF_MATCODE == undefined)) ? 0 : data[i].REF_MATCODE)
            Parm[Parms[0].QTY] = (((data[i].QTY == null) || (data[i].QTY == undefined)) ? 0 : data[i].QTY)
            Parm[Parms[0].SYSADD_DATETIME] = (((data[i].SYSADD_DATETIME == null) || (data[i].SYSADD_DATETIME == undefined)) ? 0 : data[i].SYSADD_DATETIME)
            Parm[Parms[0].SYSADD_LOGIN] = (((data[i].SYSADD_LOGIN == null) || (data[i].SYSADD_LOGIN == undefined)) ? 0 : data[i].SYSADD_LOGIN)
            Parm[Parms[0].STATUS_CODE] = (((data[i].STATUS_CODE == null) || (data[i].STATUS_CODE == undefined)) ? 0 : data[i].STATUS_CODE)
            // Parms = []
            tempParms.push(Parm)
        }



        return tempParms
    }
}
module.exports = new DoorType();

