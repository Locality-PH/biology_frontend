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
        if(status === 'Approved') {
            return 'cyan'
        }
        if(status === 'Pending') {
            return 'blue'
        }
      if(status === 'Rejected') {
            return 'volcano'
        }
        return ''
    }
    
    const tableColumns = [
        {
            title: 'Suggestor',
            dataIndex: 'name',
            render: (_, record) => (
                <Flex>
                    <AvatarStatus size={30} src={record.image} name={record.name}/>
                </Flex>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'Campaign Name',
            dataIndex: 'campaignName',
            render: (_, record) => (
                <Flex>
                    <AvatarStatus size={30} src={record.logo} name={record.campaignName}/>
                </Flex>
            )
        },
        {
            title: 'Date',
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
            title: 'Category',
            dataIndex: 'category',
            render: (_, record) => (
                <span className="font-weight-semibold">
                {record.category}
                </span>
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
                        <Link to="/">
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
    
    const campaignCategory = (value) => {
        if (value !== "All") {
            const key = "category";
            const data = utils.filterArray(campaignListData, key, value);
            setCampaignList(data);
        } else {
            setCampaignList(campaignListData);
        }
    };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card title="Campaigns Suggestion">
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
                  <div className="mb-3">
                    <Select
                      defaultValue="All"
                      className="w-100"
                      style={{ minWidth: 180 }}
                      placeholder="Category"
                      onChange={campaignCategory}
                    >
                      <Option value="All">All</Option>
                      {categories.map((elm) => (
                        <Option key={elm} value={elm}>
                          {elm}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Flex>
              </Flex>
              <Table
                  pagination={true}
                  columns={tableColumns} 
                  dataSource={campaignList} 
                  rowKey='id'
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TableList;