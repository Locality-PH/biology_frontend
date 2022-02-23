import React, {useState, useEffect} from 'react'
import { Card, Table, Menu, Button, message} from 'antd';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Link } from "react-router-dom";
import { 
	EyeOutlined
} from '@ant-design/icons';
import axios from "axios";

const ModuleLessonsTable = ({moduleId, classCode}) => {
    const [lessons, setLessons] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const menu_icons_style = {
      display: "inline-flex",
      paddingRight: "5px"
    }

    useEffect(() => {
        axios.get("/api/module/get-module-lessons/" + moduleId).then((response) => {
            setLessons(response.data)
            setIsLoading(false);
          }).catch(() => {
            message.error("Could not fetch the data in the server!")
          });
    }
    , []);

    const tableColumns = [
      {
        title: 'Lesson Name',
        dataIndex: 'lesson_name',
        render: (_, result) => (
            <span>{result.lesson_name}</span>
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
          title: 'Finished Students',
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
                        <Link to={`/admin/classroom/${classCode}/module/${moduleId}/lesson/${result.module_lesson_id}`}>
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
    
  return (
    <>
      <Card title="Lessons" extra={<><Link to={"/admin/classroom/" + classCode}><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link></>}>
        <Table
            pagination={true}
            columns={tableColumns} 
            dataSource={lessons} 
            rowKey='module_lesson_id'
            loading={isLoading}
            scroll={{ x: "max-content" }}
        />
      </Card>
    </>
  )
}

export default ModuleLessonsTable;