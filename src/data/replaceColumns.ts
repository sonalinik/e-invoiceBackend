
class ReplaceColumn {
    async replaceColumns(DSMaster, RplVal) {
        for (let i = 0; i <= DSMaster.length - 1; i++) {
            for (let key in RplVal) {
                if (DSMaster[i][key] !== RplVal[key]) {
                    DSMaster[i][key] = (DSMaster[i][key] == 0 ? RplVal[key] : DSMaster[i][key])
                }
            }
        }
        return DSMaster
    }
}
module.exports = new ReplaceColumn();

