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

const ModuleLessonsTable = ({moduleId, classCode}) => {
    const [modules, setModules] = useState([]);
    const [modulesList, setModulesList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const menu_icons_style = {
      display: "inline-flex",
      paddingRight: "5px"
    }

    useEffect(() => {
        axios.get("/api/teacher/get-classroom-modules/" + classCode).then((response) => {
            setModules(response.data)
            setModulesList(response.data)
            setIsLoading(false);
          }).catch(() => {
            message.error("Could not fetch the data in the server!")
          });
    }
    , []);

    const tableColumns = [
      {
        title: 'Lesson Name',
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
      title: 'File Name',
      dataIndex: 'lesson_count',
      render: (_, result) => (
          <span>{result.lesson_count}</span>
      )
    }
    ,
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
      <Card title="Lessons" extra={<><Link to={"/admin/classroom/" + classCode}><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link></>}>
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

export default ModuleLessonsTable;