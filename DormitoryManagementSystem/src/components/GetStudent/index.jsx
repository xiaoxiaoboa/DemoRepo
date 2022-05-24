import "./index.css"
import { useEffect } from "react"

import {
  DataGrid,
  zhCN,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton
} from "@mui/x-data-grid"
import axios from "axios"
import { useRecoilState } from "recoil"
import { studentState, pageSizeState, pendingSubmit } from "../../recoil"

export default function GetStudent() {
  const [pageSize, setPageSize] = useRecoilState(pageSizeState)
  const [students, setStudent] = useRecoilState(studentState)
  const [pendingStudentItem, setPending] = useRecoilState(pendingSubmit)
  const [pendingDelete, setPendingDelete] = useRecoilState(pendingSubmit)
  useEffect(() => {
    getStudents()
  }, [])

  /* 向数据库请求数据 */
  const getStudents = async () => {
    const res = await (await axios.get("/api/student")).data
    /* 给每个数据对象加上id号,以适应表格呈现 */
    const newArr = res.map(obj => {
      return { id: res.indexOf(obj) + 1, ...obj }
    })
    setStudent(newArr)
  }

  /* 处理编辑 */
  const handleEdit = params => {
    /* 拿到输入的值,整理成对象形式 */
    const newParams = {
      id: params.id,
      data: { [`${params.field}`]: params.value }
    }
    const targetObj = students.find(obj => obj.id === newParams.id)
    newParams.data = { ...newParams.data, ["_id"]: targetObj._id }

    /* 生成数据库对应格式后,更新状态 */
    setPending({
      ...pendingStudentItem,
      item: [newParams.data, ...pendingStudentItem[`item`]]
    })
  }

  /* 处理选择删除 */
  const handleSelect = selectionModel => {
    if (selectionModel.length < 1)
      return setPendingDelete({ ...pendingDelete, [`delete`]: [] })
    const newArr = students.filter(obj => {
      return selectionModel.includes(obj.id)
    })
    setPending({
      ...pendingDelete,
      delete: [...newArr, ...pendingDelete[`delete`]]
    })
  }

  /* 表格列标题 */
  const columns = [
    { field: "id", headerName: "ID", width: 90, flex: 0.1 },
    {
      field: "name",
      headerName: "姓名",
      editable: true,
      flex: 0.3
    },
    {
      field: "age",
      headerName: "年龄",
      editable: true,
      minwidth: 30,
      flex: 0.3
    },

    {
      field: "stuId",
      headerName: "学号",
      flex: 0.7
    },
    {
      field: "major",
      headerName: "专业",
      editable: true,
      flex: 0.5
    },
    {
      field: "class",
      headerName: "班级",
      editable: true,
      flex: 0.3
    },
    {
      field: "roomId",
      headerName: "房间号",
      editable: true,
      flex: 0.4
    },
    {
      field: "drom",
      headerName: "书院",
      editable: true,
      flex: 0.4
    },
    {
      field: "building",
      headerName: "楼号",
      editable: true,
      flex: 0.3
    }
  ]
  return (
    <>
      <div className="infoTable" style={{ height: 475, width: "100%" }}>
        <div style={{ display: "flex", height: "460px" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              sx={{ borderRadius: "20px" }}
              rows={students}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[6, 10, 20, 40, 60, 80, 100]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              checkboxSelection
              disableSelectionOnClick
              localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
              components={{ Toolbar: CustomToolbar }}
              onCellEditCommit={handleEdit}
              onSelectionModelChange={handleSelect}
            />
          </div>
        </div>
      </div>
    </>
  )
}
/* 自定义工具栏 */
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport
        csvOptions={{
          fileName: "学生数据",
          utf8WithBom: true
        }}
        printOptions={{ disableToolbarButton: true }}
      />
    </GridToolbarContainer>
  )
}
