import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { Table, Card, Row, Col, Button, Input, Menu, message } from "antd";
import Axios from 'axios'
import utils from 'utils'

import {
    EyeOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    PushpinOutlined
} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'

import "assets/css/app-views/Classwork/Classwork.css"

const Classwork = () => {
    let history = useHistory();
    
    const [isLoading, setIsLoading] = useState(true)
    const [classwork, setClasswork] = useState([])
    const [classworkList, setClassworkList] = useState([])

    const tid = localStorage.getItem("tid");

    // console.log("Classwork: ", classwork)

    useEffect(() => {

        (async () => {
            await Axios.post("/api/classwork/get-all/" + tid).then((response) => {
                const classworkData = response.data;
                // console.log(classworkData)
                setClasswork(classworkData)
                setClassworkList(classworkData)
            }).catch(() => {
                message.error("Could not fetch the data in the server!")
            });;

            setIsLoading(false)
            

        })()



    }, [])

    const columns = [
        {
            title: 'Classwork Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Classwork Code',
            dataIndex: 'classwork_link',
            key: 'classwork_link',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            width: '20%',
            align: 'center',
            key: 'actions',
            render: (_, result, rowKey) => (
                <div className="">
                    <EllipsisDropdown
                        menu={
                            <Menu className="classwork-menu">
                                <Menu.Item key="0">
                                    <Link to={`classwork/view/${result.classwork_link}`}>
                                        <EyeOutlined className="menu-icons" />
                                        <span className="ml-2">View</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="1">
                                    <Link to={`classwork/edit/${result.classwork_link}`}>
                                        <EditOutlined className="menu-icons" />
                                        <span className="ml-2">Edit</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="2" onClick={() => deleteClasswork(result.classwork_id, rowKey)}>
                                    <>
                                        <DeleteOutlined className="menu-icons" />
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

    const onClassworkSearch = (e) => {
        const value = e.currentTarget.value;
        const searchArray = e.currentTarget.value ? classworkList : classwork;
        const data = utils.wildCardSearch(searchArray, value);
        setClassworkList(data);
    };

    const deleteClasswork = (Cid, rowKey) => {
        // console.log(Cid)
        // console.log(rowKey)

        Axios.delete('/api/classwork/delete', { data: { tid, Cid } }).then((response) => {
            const data = response.data;
            // console.log(data)

            let tempClasswork = classwork
            tempClasswork = tempClasswork.filter((value, index) => index!==rowKey)
            setClasswork(tempClasswork)
            setClassworkList(tempClasswork)
            message.success("Classwork deleted.")
    
        }).catch(() => {
            message.error("Error cannot connect to database!!")
        });;
    }

    return (
        <div className="classwork">
            <Card
                className="card-box-shadow-style"
                title="Quizzes"
                extra={
                    <>
                        <Link to="/admin/classwork/create-new">
                            <Button type="primary"
                                style={{ backgroundColor: "green", borderColor: "green" }}
                            >
                                New Classwork
                            </Button>
                        </Link>
                    </>
                }>

                <Row className="" style={{ marginBottom: "20px" }}>
                    <Col xxl={6} xl={6} lg={8} md={8} sm={10} xs={24}>
                        <Input
                            placeholder="Search"
                            prefix={<SearchOutlined />}
                            style={{ width: "100%" }}
                            onChange={(e) => onClassworkSearch(e)}
                        />
                    </Col>
                </Row>

                <Table
                    pagination={true}
                    columns={columns}
                    dataSource={classworkList}
                    rowKey="classwork_id"
                    loading={isLoading}
                    scroll={{ x: "max-content" }}
                />
            </Card>
        </div>
    )
}

export default Classwork
