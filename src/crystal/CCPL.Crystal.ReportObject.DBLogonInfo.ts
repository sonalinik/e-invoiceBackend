
class DBLogonInfo {
    mstrServer = ""
    mstrDatabase = ""
    mstrUserID = ""
    mstrPassword = ""


    public  Clone() {
        let obj =   new DBLogonInfo()
        // obj = Me
        return obj
    }
}
module.exports = new DBLogonInfo();

