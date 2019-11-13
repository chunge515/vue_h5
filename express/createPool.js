const dbConfig = require('./dbConfig');
const mySql = require('mysql');

// 链接数据库
// 用 createConnection 创建 Mysql 连接，每执行一次 connection.query 都是一个全新的连接，会造成一个资源的极大浪费，降低性能。
// const pool = mySql.createConnection(dbConfig);

// 链接池：创建多个链接、复用与分发链接
const pool = mySql.createPool(dbConfig);


const query = (sql,callback) => {
    pool.getConnection((err,connection) => {
        if(err) console.log('数据库链接失败:', err); 
        connection.query(sql, (err,results) => {
            callback(err, results) // 结果回调
            connection.release() // 释放连接资源 | 跟 connection.destroy() 不同，它是销毁
        });
    });
};


module.exports = query;