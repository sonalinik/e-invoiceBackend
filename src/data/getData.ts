
class GetData {
    async GetSPData(spName, params, conn) {
        let data = ' '
        for (let i = 0; i <= params.length; i++) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    data = data + '@' + key + '=' + `'${params[key]}'` + ','
                }
            }
            data = data.replace(/,\s*$/, "");

        }
        let result = await conn.request().query(`${spName} ${data}`);

        conn.close()
        return result.recordsets

    }
}
module.exports = new GetData();

