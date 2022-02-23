import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { Table, Card, Row, Col, Button, Input, Menu, message, Modal } from "antd";
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentClasswork, setCurrentClasswork] = useState({});

    const tid = localStorage.getItem("tid");

    // console.log("Classwork: ", classwork)

    useEffect(() => {

        (async () => {
            await Axios.post("/api/classwork/get-all/" + tid).then((response) => {
                const classworkData = response.data;
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
            title: 'Time Updated',
            dataIndex: 'classwork_link',
            key: 'classwork_link',
            render: (_, result) => (
                <span>{new Date(result.updatedAt).toDateString()}, {new Date(result.updatedAt).toLocaleTimeString()}</span>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            width: '10%',
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
                                <Menu.Item key="2" onClick={() => deleteClasswork(result.classwork_id, rowKey, result.classwork_link)}>
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

    const deleteClasswork = (cid, rowKey, classwork_link) => {
        setCurrentClasswork({cid, rowKey, classwork_link})
        showModal()
    }
    

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);

        Axios.delete('/api/classwork/delete', { data: { tid, cid: currentClasswork.cid, cc: currentClasswork.classwork_link } }).then((response) => {
            const data = response.data;
            // console.log(data)

            let tempClasswork = classwork
            tempClasswork = tempClasswork.filter((value, index) => index !== currentClasswork.rowKey)
            setClasswork(tempClasswork)
            setClassworkList(tempClasswork)
            message.success("Classwork deleted.")

        }).catch((error) => {
            console.log(error)
            message.error("Error cannot connect to database!!")
        });;
    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    return (
        <div className="classwork">
            <Card
                className="card-box-shadow-style"
                title="Classworks"
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

            <Modal title="Deleting Classwork" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p style={{textAlign: "justify"}}>Classwork and all recorded data will be permanently deleted. And you have to assign a substitute classwork in your module/lesson for student to continue their progress. Do you still want to continue??</p>
            </Modal>
        </div>
    )
}

export default Classwork
