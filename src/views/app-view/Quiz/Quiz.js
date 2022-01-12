import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { Table, Card, Row, Col, Button, Input, Menu } from "antd";

import {
    EyeOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    PushpinOutlined
} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'

import "assets/css/app-views/Quiz/Quiz.css"

const Quiz = () => {
    const [isLoading, setIsLoading] = useState(false)

    const dataSource = [
        {
            key: '1',
            name: 'Quiz 1',
            module: "Biology",
            classroom: "Test Classroom 1",
        },
        {
            key: '2',
            name: 'Quiz 3',
            module: "Math",
            classroom: "Test Classroom 2",
        },
    ];

    const columns = [
        {
            title: 'Quiz Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Module Assigned',
            dataIndex: 'module',
            key: 'module',
        },
        {
            title: 'Classroom',
            dataIndex: 'classroom',
            key: 'classroom',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            width: '10%',
            align: 'center',
            key: 'actions',
            render: (_, result) => (
                <div className="">
                    <EllipsisDropdown
                        menu={
                            <Menu className="quiz-menu">
                                <Menu.Item key="0">
                                    <Link to={`quiz/view/${result.key}`}>
                                        <EyeOutlined className="menu-icons"/>
                                        <span className="ml-2">View</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="1">
                                    <Link to={`quiz/edit/${result.key}`}>
                                        <EditOutlined className="menu-icons"/>
                                        <span className="ml-2">Edit</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to={`quiz/assign/${result.key}`}>
                                        <PushpinOutlined className="menu-icons"/>
                                        <span className="ml-2">Assign</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="3" onClick={() => deleteClassroom(result.teacher_id)}>
                                    <>
                                        <DeleteOutlined className="menu-icons"/>
                                        <span className="ml-2">Delete</span>
                                    </>
                                </Menu.Item>
                            </Menu>
                        }

                    />
                </div>
            )
        },
    ];

    return (
        <div className="quiz">
            <Card
                className="card-box-shadow-style"
                title="Quizzes"
                extra={
                    <>
                        <Link to="/admin/quiz/create-new">
                            <Button type="primary"
                                style={{ backgroundColor: "green", borderColor: "green" }}
                            >
                                New Quiz
                            </Button>
                        </Link>
                    </>
                }>

                <Row className="" style={{ marginBottom: "20px" }}>
                    <Col xxl={24} xl={6} lg={8} md={8} sm={10} xs={24}>
                        <Input
                            placeholder="Search"
                            prefix={<SearchOutlined />}
                            style={{ width: "100%" }}
                        // onChange={(e) => onClassroomSearch(e)}
                        />
                    </Col>
                </Row>

                <Table
                    pagination={true}
                    columns={columns}
                    dataSource={dataSource}
                    rowKey='class_code'
                    loading={isLoading}
                    scroll={{ x: "max-content" }}
                    rowKey={dataSource.key}
                />
            </Card>
        </div>
    )
}

export default Quiz
