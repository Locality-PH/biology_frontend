import React, {useState, useEffect} from 'react'
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card, Table, Menu, Input, Button, message} from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import utils from 'utils'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Link } from "react-router-dom";
import {
	EyeOutlined,
  SearchOutlined,
  EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import axios from "axios";

const MyModule = () => {
    const teacherId = localStorage.getItem("tid");

    const [myModules, setMyModules] = useState([]);
    const [myModulesList, setMyModulesList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [deletedMessage, setDeletedMessage] = useState("");

    const menu_icons_style = {
      display: "inline-flex",
      paddingRight: "5px"
    }

    useEffect(() => {
        axios.get("/api/module/get-my-modules/" + teacherId).then((response) => {
          console.log(response.data)
            setMyModules(response.data)
            setMyModulesList(response.data)
            setIsLoading(false);
          }).catch(() => {
            message.error("Could not fetch the data in the server!")
          });
    }
    , []);

    const deleteMyModule = (myModuleId, moduleName) => {
      message.loading("Deleting " + moduleName + "...", 0)
      
      axios.post("/api/module/delete-my-module", {"teacher_id": teacherId, "_id": myModuleId}).then((response) => {
        if(response.data == "Deleted"){
          message.destroy()
          setMyModulesList(
            myModulesList.filter((myModule) => myModule._id !== myModuleId)
            )
          message.success(moduleName + " has been successfully deleted")
        }else{
          message.destroy()
          message.error("The action can't be completed, please try again.")
        }
      }).catch(error => {
          console.log(error)
          message.destroy()
          message.error("The action can't be completed, please try again.")
      });

    }

    const tableColumns = [
        {
            title: 'Module Name',
            dataIndex: 'module_name',
            render: (_, result) => (
                <span>{result.module_name}</span>
            )
        },
        {
          title: 'Topic',
          dataIndex: 'topic',
          render: (_, result) => (
              <span>{result.topic}</span>
          )
        },
        {
          title: 'Classwork Code',
          dataIndex: 'classwork_code',
          render: (_, result) => (
              <span>{(result.classwork_code == "" ? "None": result.classwork_code)}</span>
          )
        },
        {
          title: 'Lesson Count',
          dataIndex: 'lesson_count',
          render: (_, result) => (
              <span>{result.lesson_count}</span>
          )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, result) => (
                <EllipsisDropdown 
            menu={
                <Menu>
                    {/* <Menu.Item key="0">
                        <Link to={`classroom/${result._id}`}>
                            <EyeOutlined style={menu_icons_style}/>
                            <span className="ml-2">View</span>
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item key="0">
                        <Link to={`module/edit-my-module/${result._id}`}>
                            <EditOutlined style={menu_icons_style}/>
                            <span className="ml-2">Edit</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="1" onClick={() => deleteMyModule(result._id, result.module_name)}>
                        <>
                            <DeleteOutlined style={menu_icons_style}/>
                            <span className="ml-2">Delete</span>
                        </>
                    </Menu.Item>
                </Menu>
            }
        />
            )
        }
      ]

    const onMyModulesSearch = (e) => {
        const value = e.currentTarget.value;
        const searchArray = e.currentTarget.value ? myModulesList : myModules;
        const data = utils.wildCardSearch(searchArray, value);
        setMyModulesList(data);
    };
    
  return (
    <>
        <Card title="My Modules" extra={
        <>
            <Link to="module/create-my-module">
                <Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>New Modules</Button>
            </Link>
        </>}>
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
                    onChange={(e) => onMyModulesSearch(e)}
                />
                </div>
            </Flex>
            </Flex>
            <Table
                pagination={true}
                columns={tableColumns} 
                dataSource={myModulesList} 
                rowKey='_id'
                loading={isLoading}
                scroll={{ x: "max-content" }}
            />
        </Card>
    </>
  )
}

export default MyModule;