import React from 'react';
import { Table,Icon,Pagination } from 'antd'

const TableComponent = ({
    loading,
    dataSource,
    columns,
    rowKey,
    pagination,
    tableChange
}) => {

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    return (
        <div>
            <Table 
                bordered
                loading={loading}
                dataSource={dataSource}
                columns={columns}
                rowKey={rowKey}
                pagination={paginationProps}
                onChange={tableChange}
            />
            
        </div>
    )
}

export default TableComponent;