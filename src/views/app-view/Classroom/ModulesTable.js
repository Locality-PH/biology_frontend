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
    DownloadOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import axios from "axios";

const ModulesTable = ({classCode}) => {
    const [modules, setModules] = useState([]);
    const [modulesList, setModulesList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/teacher/get-classroom-modules/" + classCode).then((response) => {
            setModules(response.data)
            setModulesList(response.data)
            setIsLoading(false);
            setError(null);
            console.log(response.data)
          }).catch(() => {
            setIsLoading(false);
            setError("Could not fetch the data in the server!");
          });
    }
    , []);

    const viewModule = (moduleId) => {
      console.log("View")
      window.open("http://localhost:5000/teacher/view-module/" + moduleId, "_blank")
    }

    const downloadModule = (moduleId) => {
      console.log("Downloading")
      window.open("http://localhost:5000/teacher/download-module/" + moduleId, "_blank")
    }

    const deleteModule = (moduleId, moduleName) => {
      message.loading("Deleting " + moduleName, 0 + "...")
      
      axios.post("http://localhost:5000/teacher/delete-module", {"class_code": classCode, "module_id": moduleId}).then((response) => {
        if(response.data == "Deleted"){
          message.destroy()
          setModulesList(
            modulesList.filter((module) => module.teacher_id !== moduleId)
            )
          message.success(moduleName + " has bee successfully deleted")
        }else{
          message.destroy()
          message.error("The action can't be completed, please try again.")
        }
      });

    }

    const tableColumns = [
        {
            title: 'Module Name',
            dataIndex: 'name',
            render: (_, result) => (
                <Flex>
                    <AvatarStatus src="/img/thumbs/thumb-5.jpg" size={30} name={result.module_name}/>
                </Flex>
            )
        },
        {
            title: 'File Name',
            dataIndex: 'filename',
            render: (_, result) => (
                <span>{result.module_file.filename}</span>
            )
        },
        {
          title: 'File Name',
          dataIndex: 'filename',
          render: (_, result) => (
              <span>{result.module_file.filename}</span>
          )
      },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, result) => (
                <EllipsisDropdown 
            menu={
                <Menu>
                    <Menu.Item key="0" onClick={() => viewModule(result.teacher_id)}>
                        <>
                            <EyeOutlined />
                            <span className="ml-2">View</span>
                        </>
                    </Menu.Item>
                    <Menu.Item key="1" onClick={() => downloadModule(result.teacher_id)}>
                        <>
                            <DownloadOutlined />
                            <span className="ml-2">Download</span>
                        </>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="2" onClick={() => deleteModule(result.teacher_id, result.module_name)}>
                        <>
                            <DeleteOutlined />
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
            rowKey='teacher_id'
            loading={isLoading}
            scroll={{ x: "max-content" }}
        />
      </Card>
    </>
  )
}

export default ModulesTable;