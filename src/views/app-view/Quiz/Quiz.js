import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
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

import "assets/css/app-views/Quiz/Quiz.css"

const Quiz = () => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [quiz, setQuiz] = useState([])
    const [quizList, setQuizList] = useState([])

    const tid = localStorage.getItem("tid");

    // console.log("Quiz: ", quiz)

    useEffect(() => {

        (async () => {
            await Axios.post("/api/quiz/get-all/" + tid).then((response) => {
                const quizData = response.data;
                // console.log(quizData)
                setQuiz(quizData)
                setQuizList(quizData)
            }).catch(() => {
                message.error("Could not fetch the data in the server!")
            });;

            setIsLoading(false)
            

        })()



    }, [])

    const columns = [
        {
            title: 'Quiz Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quiz Code',
            dataIndex: 'quiz_link',
            key: 'quiz_link',
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
                            <Menu className="quiz-menu">
                                <Menu.Item key="0">
                                    <Link to={`quiz/view/${result.quiz_link}`}>
                                        <EyeOutlined className="menu-icons" />
                                        <span className="ml-2">View</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="1">
                                    <Link to={`quiz/edit/${result.quiz_link}`}>
                                        <EditOutlined className="menu-icons" />
                                        <span className="ml-2">Edit</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="2" onClick={() => deleteQuiz(result.quiz_id, rowKey)}>
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

    const onQuizSearch = (e) => {
        const value = e.currentTarget.value;
        const searchArray = e.currentTarget.value ? quizList : quiz;
        const data = utils.wildCardSearch(searchArray, value);
        setQuizList(data);
    };

    const deleteQuiz = (Qid, rowKey) => {
        // console.log(Qid)
        // console.log(rowKey)

        Axios.delete('/api/quiz/delete', { data: { tid, Qid } }).then((response) => {
            const data = response.data;
            // console.log(data)

            let tempQuiz = quiz
            tempQuiz = tempQuiz.filter((value, index) => index!==rowKey)
            setQuiz(tempQuiz)
            setQuizList(tempQuiz)
            message.success("Quiz deleted.")
    
        }).catch(() => {
            message.error("Error cannot connect to database!!")
        });;
    }

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
                    <Col xxl={6} xl={6} lg={8} md={8} sm={10} xs={24}>
                        <Input
                            placeholder="Search"
                            prefix={<SearchOutlined />}
                            style={{ width: "100%" }}
                            onChange={(e) => onQuizSearch(e)}
                        />
                    </Col>
                </Row>

                <Table
                    pagination={true}
                    columns={columns}
                    dataSource={quizList}
                    rowKey="quiz_id"
                    loading={isLoading}
                    scroll={{ x: "max-content" }}
                />
            </Card>
        </div>
    )
}

export default Quiz
