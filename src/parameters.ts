
class GetParameters {
    getItem(Parms) {
        let para = {}
        let param = new Array()
        for (let i = 0; i <= Parms[0].length - 1; i++) {
            para = {
                [Parms[0][i]]: Parms[i + 1]
            }
            param.push(para)
        }
        return param
    }
}
module.exports = new GetParameters();

