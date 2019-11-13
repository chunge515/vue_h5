const sqlMap = {
    getValue: 'SELECT * FROM ansible_hosts t1, ansible_group t2 WHERE t1.project_group_id=t2.id ',
    getCount: 'select Count(*) from ansible_hosts t1, ansible_group t2 WHERE t1.project_group_id=t2.id',
    getObjectName: 'SELECT * from ansible_group'
}

module.exports = sqlMap