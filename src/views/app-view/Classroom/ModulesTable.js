import React, {useState, useEffect} from 'react'
import { Card, Table, Menu, Input, Button, message} from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import utils from 'utils'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Link } from "react-router-dom";
import { 
	EyeOutlined,
    SearchOutlined,
    SolutionOutlined,
    EditOutlined,
    DownloadOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import axios from "axios";

const ModulesTable = ({classCode}) => {
    const [modules, setModules] = useState([]);
    const [modulesList, setModulesList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const menu_icons_style = {
      display: "inline-flex",
      paddingRight: "5px"
    }

    useEffect(() => {
        axios.get("/api/teacher/get-classroom-modules/" + classCode).then((response) => {
            setModules(response.data)
            setModulesList(response.data)
            setIsLoading(false);
            setError(null);
          }).catch(() => {
            message.error("Could not fetch the data in the server!")
          });
    }
    , []);

    const viewModule = (moduleId) => {
      console.log("View")
      window.open("/teacher/view-module/" + moduleId, "_blank")
    }

    const downloadModule = (moduleId) => {
      console.log("Downloading");
      window.location.assign(
        "https://biology-server.herokuapp.com/api/teacher/download-module/" + moduleId,
        "_blank"
      );
    }

    const deleteModule = (moduleId, moduleName) => {
      message.loading("Deleting " + moduleName + "...", 0)
      
      axios.post("/api/teacher/delete-module", {"class_code": classCode, "module_id": moduleId}).then((response) => {
        if(response.data == "Deleted"){
          message.destroy()
          setModulesList(
            modulesList.filter((module) => module._id !== moduleId)
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
    }
    ,
    {
      title: 'Type',
      dataIndex: 'type',
      render: (_, result) => (
          <span>{result.type}</span>
      )
    },
        {
          title: 'Finished by',
          dataIndex: 'finished',
          render: (_, result) => (
              <span>{result.finished} student</span>
          )
      },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, result) => (
                <EllipsisDropdown 
            menu={
                <Menu>
                    <Menu.Item key="0">
                        <Link to={`/admin/classroom/${classCode}/module/${result._id}`}>
                            <EyeOutlined style={menu_icons_style}/>
                            <span className="ml-2">View</span>
                        </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="1">
                        <Link to={`/admin/classroom/${classCode}/module/${result._id}`}>
                            <SolutionOutlined style={menu_icons_style}/>
                            <span className="ml-2">Finished Students</span>
                        </Link>
                    </Menu.Item> */}
                     <Menu.Item key="1">
                        <Link to={(result.type == "MyModule")?`/admin/module/edit-my-module/${result.module_id}`:
                      `/admin/module/edit-preset-module/${result.module_id}`}>
                            <EditOutlined style={menu_icons_style}/>
                            <span className="ml-2">Edit</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="2" onClick={() => deleteModule(result._id, result.module_name)}>
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

    const onClassroomSearch = (e) => {
        const value = e.currentTarget.value;
        const searchArray = e.currentTarget.value ? modulesList : modules;
        const data = utils.wildCardSearch(searchArray, value);
        setModulesList(data);
    };
    
  return (
    <>
      <Card title="Modules">
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
                onChange={(e) => onClassroomSearch(e)}
              />
            </div>
          </Flex>
        </Flex>
        <Table
            pagination={true}
            columns={tableColumns} 
            dataSource={modulesList} 
            rowKey='_id'
            loading={isLoading}
            scroll={{ x: "max-content" }}
        />
      </Card>
    </>
  )
}

export default ModulesTable;