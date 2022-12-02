
class InsertMultiple {
    async insertMultiples(spName, DSMaster, objConn) {

        for (let i = 0; i <= DSMaster.length - 1; i++) {
            let data = ' '
            for (var key in DSMaster[i]) {
                if (DSMaster[i].hasOwnProperty(key)) {
                    data = data + '@' + key + '=' + `'${DSMaster[i][key]}'` + ','
                }
            }
            data = data.replace(/,\s*$/, "");


            let result = await objConn.request().query(`${spName} ${data}`);


            // return result.recordsets
        }

        objConn.close()


    }

    async delete(table, code, objConn) {
        let result = await objConn.request().query(`DELETE FROM ${table} WHERE CODE = ${code}`);
    }
}
module.exports = new InsertMultiple();

