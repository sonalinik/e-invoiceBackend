const tableobj = require('../TableObject/CCPL.Finance.MSTCOMMFILLER');

class Filler {
    async Filler(data) {

        let Parms = new Array()
        let Parm = {}
        Parms = tableobj.GetSchema(tableobj.SP_INS_MSTCOMMFILLER)
        Parm[Parms[0].CODE] = (((data.CODE == null) || (data.CODE == undefined)) ? 0 : data.CODE)
        Parm[Parms[0].NAME] = (((data.NAME == null) || (data.NAME == undefined)) ? 0 : data.NAME)
        Parm[Parms[0].SYSADD_DATETIME] = (((data.SYSADD_DATETIME == null) || (data.SYSADD_DATETIME == undefined)) ? 0 : data.SYSADD_DATETIME)
        Parm[Parms[0].SYSADD_LOGIN] = (((data.SYSADD_LOGIN == null) || (data.SYSADD_LOGIN == undefined)) ? 0 : data.SYSADD_LOGIN)
        Parm[Parms[0].SYSCHNG_DATETIME] = (((data.SYSCHNG_DATETIME == null) || (data.SYSCHNG_DATETIME == undefined)) ? 0 : data.SYSCHNG_DATETIME)
        Parm[Parms[0].SYSCHNG_LOGIN] = (((data.SYSCHNG_LOGIN == null) || (data.SYSCHNG_LOGIN == undefined)) ? 0 : data.SYSCHNG_LOGIN)
        Parm[Parms[0].STATUS_CODE] = (((data.STATUS_CODE == null) || (data.STATUS_CODE == undefined)) ? 0 : data.STATUS_CODE)
        
        Parms = []
        Parms.push(Parm)
        return Parms
    }
}
module.exports = new Filler();

