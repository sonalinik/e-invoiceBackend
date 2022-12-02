
const mssql = require('mssql');
class DBSubConnection {
  async getConnection(CODE, conn) {

    const result = await conn.request().query(`SELECT * FROM CNFCOMPANYLIST WHERE COMPANY_ID = ${CODE} AND STATUS_CODE = 0`);
    conn.close()
    return await mssql.connect({
      user: result.recordsets[0][0].DBUSER_ID,
      host: 'localhost',
      password: result.recordsets[0][0].DBUSER_PASSWORD,
      server: 'localhost',
      database: result.recordsets[0][0].ERP_DATABASE,
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
}
module.exports = new DBSubConnection();

