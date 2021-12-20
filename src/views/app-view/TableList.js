import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card, Table, Tag, Menu, Input, Select} from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { 
	campaignListData
} from './CampaignDashboardData'
import moment from 'moment'; 
import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
import utils from 'utils'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Link } from "react-router-dom";
import { 
	EyeOutlined,
    SearchOutlined
} from '@ant-design/icons';
const { Option } = Select;
const categories = ["Health", "Technology", "Sport", "Environment"];

const TableList = () => {
  const [campaignList, setCampaignList] = useState(campaignListData);

    const getShippingStatus = status => {
        if(status === 'Completed') {
            return 'green'
        }
        if(status === 'Ongoing') {
            return 'blue'
        }
        return ''
    }
    
    const tableColumns = [
          {
            title: 'Classroom Code',
            dataIndex: 'code',
            render: (_, record) => (
                <span>#{record.code}</span>
            )
        },
        {
            title: 'Classroom Name',
            dataIndex: 'name',
            render: (_, record) => (
                <Flex>
                    <AvatarStatus size={30} src={record.image} name={record.name}/>
                </Flex>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'Section Name',
            dataIndex: 'campaignName',
            render: (_, record) => (
              <span>{record.campaignName}</span>
            )
        },
        {
            title: 'Date Created',
            dataIndex: 'date',
            render: (_, record) => (
                <span>{moment.unix(record.date).format(DATE_FORMAT_DD_MM_YYYY)}</span>
            )
        },
        {
          title: 'Status',
          dataIndex: 'orderStatus',
          render: (_, record) => (
              <><Tag color={getShippingStatus(record.orderStatus)}>{record.orderStatus}</Tag></>
          )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <EllipsisDropdown 
            menu={
                <Menu>
                    <Menu.Item key="0">
                        <Link to={`classroom/${record.id}`}>
                            <EyeOutlined />
                            <span className="ml-2">View</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            }
        />
            )
        }
    
      ]

    const onCampaignSearch = (e) => {
        const value = e.currentTarget.value;
        const searchArray = e.currentTarget.value ? campaignList : campaignListData;
        const data = utils.wildCardSearch(searchArray, value);
        setCampaignList(data);
    };
    
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card title="Teacher Classroom">
              <Flex
                alignItems="center"
                className=""
                justifyContent="between"
                mobileFlex={false}
              >
                <Flex className="mb-1" mobileFlex={false}>
                  <div className="mb-3 mr-md-3">
                    <Input
                      placeholder="Search"
                      prefix={<SearchOutlined />}
                      onChange={(e) => onCampaignSearch(e)}
                    />
                  </div>
                </Flex>
              </Flex>
              <Table
                  pagination={true}
                  columns={tableColumns} 
                  dataSource={campaignList} 
                  rowKey='id'
                  scroll={{ x: "max-content" }}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TableList;