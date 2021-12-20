import React from 'react'
import { Card, Table, Button, Tag, Space, Divider } from 'antd'
import {
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
  } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;

const TestAntDesign = () => {
    const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    ];
    return (
        <>
            <h4>Test Ant Designs</h4>
            <Card title="Test Card" extra={<a href="#">More</a>} style={{ width: 500 }}>
                <h4>This is Card in Ant Design</h4>
                <Button type="primary" shape="round">Test Button</Button>
            </Card>
            <br></br>
            <h4>Test Icons</h4>
            <div className="icons-list">
                <HomeOutlined />
                <SettingFilled />
                <SmileOutlined />
                <SyncOutlined spin />
                <SmileOutlined rotate={180} />
                <LoadingOutlined />
            </div>
            <Divider orientation="left">Presets</Divider>
            <div>
                <Tag color="magenta">magenta</Tag>
                <Tag color="red">red</Tag>
                <Tag color="volcano">volcano</Tag>
                <Tag color="orange">orange</Tag>
                <Tag color="gold">gold</Tag>
                <Tag color="lime">lime</Tag>
                <Tag color="green">green</Tag>
                <Tag color="cyan">cyan</Tag>
                <Tag color="blue">blue</Tag>
                <Tag color="geekblue">geekblue</Tag>
                <Tag color="purple">purple</Tag>
                </div>
                <Divider orientation="left">Custom</Divider>
                <div>
                <Tag color="#f50">#f50</Tag>
                <Tag color="#2db7f5">#2db7f5</Tag>
                <Tag color="#87d068">#87d068</Tag>
                <Tag color="#108ee9">#108ee9</Tag>
            </div>
            <Card>
                <Table dataSource={data}>
                    <ColumnGroup title="Name">
                        <Column title="First Name" dataIndex="firstName" key="firstName" />
                        <Column title="Last Name" dataIndex="lastName" key="lastName" />
                    </ColumnGroup>
                    <Column title="Age" dataIndex="age" key="age" />
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column
                    title="Tags"
                    dataIndex="tags"
                    key="tags"
                    render={tags => (
                        <>
                        {tags.map(tag => (
                            <Tag color="blue" key={tag}>
                            {tag}
                            </Tag>
                        ))}
                        </>
                    )}
                    />
                    <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                        <a>Invite {record.lastName}</a>
                        <a>Delete</a>
                        </Space>
                    )}
                    />
                </Table>
            </Card>
            <br></br>
            
        </>
    )
}

export default TestAntDesign
