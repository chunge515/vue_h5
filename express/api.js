const query = require('./createPool');
const experss = require('express');
const router = experss.Router();
const $sql = require('./sqlMap');

// sql执行失败时,重写返回数据
const jsonWrite = (res, results) => {
    if (typeof results === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        })
    } else {
        res.json(results);
    }
}

// 获取项目列表数据
router.post('/getValue', (req, res) => {
    let sqlWhere = '';
    let pageNum = 1;
    let pageSize = 10;
    let valueSql = '';
    let countSql = '';

    for(key in req.body) {
        if (key === 'ip' && req.body.ip) {
            sqlWhere = sqlWhere + " and t1.ip like '%" + req.body.ip + "%'";
        } else if (key === 'project_name' && req.body.project_name) {
            sqlWhere += " and t1.project_name like '%" +  req.body.project_name+ "%'";
        } else if (key === 'env' && req.body.env) {
            sqlWhere += " and t1.env like '%" + req.body.env + "%'";
        } else if (key === 'projectGroupId' && req.body.projectGroupId) {
            sqlWhere += " and t2.id=" + req.body.projectGroupId;
        }
    }
    

    if (req.body.pageNum) {
        pageNum = req.body.pageNum
    }
    if (req.body.pageSize) {
        pageSize = req.body.pageSize
    }
    
    countSql = $sql.getCount + sqlWhere;

    sqlWhere += ' LIMIT ' + (pageNum - 1)*pageSize + ',' + pageSize;
    valueSql = $sql.getValue + sqlWhere;
    
    // 查询复合条件的选项
    const getValue = () => {
        return new Promise((resolve, reject) => {
            query(valueSql, (err, results) => {
                if (err) {
                    reject(err);
                }
                if (results) {
                    resolve(results)
                }
            });
        });
    }
    // 查询复合条件的条数
    const getCount = () => {
        return new Promise((resolve, reject) => {
            query(countSql, (err, results) => {
                if (err) {
                    reject(err);
                }
                if (results) {
                    resolve(results)
                }
            });
        });
    }
    Promise.all([getValue(), getCount()])
        .then((results) => {
            let queryResults = {
                code: '200',
                msg: 'success',
                result: [],
                total: 0,
            }
            queryResults.result = results[0];
            queryResults.total = results[1][0]['Count(*)']
            jsonWrite(res, queryResults)
        })
        .catch((err) => {
            console.log(err);
            res.json({
                code: '1',
                msg: err
            })
        });
});

// 获取项目组列表数据
router.get('/getObjectName', (req, res) => {
    
    query($sql.getObjectName, (err, results) => {
        
        let queryResults = {
            code: '200',
            msg: 'success',
            result: []
        }
        queryResults.result = results;
        if (err) {
            res.json({
                code: '1',
                msg: err
            })
        }
        if (results) {
            jsonWrite(res, queryResults)
        }
    });
});

module.exports = router;