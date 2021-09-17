import { Form, Popover, Table, TablePaginationConfig } from "antd";
import { useEffect, useState } from "react";
import { mockService } from "../service/mockService";
import { User } from "../typings";
import EditModal from "./EditModal";

const INITIAL_CURRENT = 1;
const INITIAL_PAGESIZE = 5;

type Mode = "edit" | "delete";

// It's too simple function and do not need to split to the sub component
const UserTable = () => {
  const service = mockService;
  const [form] = Form.useForm();
  const [mockData, setMockData] = useState<Array<User>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<{
    mode: Mode;
    index: number;
  }>({
    mode: "delete",
    index: -1,
  });
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
    total?: number;
  }>({
    current: INITIAL_CURRENT,
    pageSize: INITIAL_PAGESIZE,
  });

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (user: User) => {
        return (
          <div className="flex">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setCurrentIndex({
                  index: user.id,
                  mode: "edit",
                });
                setModalVisible(true);
              }}
            >
              edit
            </span>
            <span className="text-gray-300 mx-4">|</span>
            <Popover
              content={
                <div>
                  <span>Are you sure to delete this record?</span>
                  <div className="flex justify-end mt-4">
                    <a
                      onClick={() =>
                        setCurrentIndex({
                          mode: "delete",
                          index: -1,
                        })
                      }
                    >
                      Cancel
                    </a>
                    <a
                      className="ml-4"
                      onClick={async () => {
                        try {
                          const data = await mockService.deleteUser(user.id);

                          setPagination({ ...pagination, total: data.length });
                          setMockData([...data]);

                          setCurrentIndex({
                            mode: "delete",
                            index: -1,
                          });
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              }
              title="Title"
              trigger="click"
              visible={
                currentIndex.index === user.id && currentIndex.mode === "delete"
              }
              onVisibleChange={() =>
                setCurrentIndex({
                  mode: "delete",
                  index: user.id,
                })
              }
            >
              <span className="text-blue-600 cursor-pointer">delete</span>
            </Popover>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      const data = await service.queryPagedUserList(1, 5);
      setMockData([...data.rows]);
      setPagination({ ...pagination, total: data.total });
    })();
  }, []);

  const handleChange = async (pagination: TablePaginationConfig) => {
    const {
      current = INITIAL_CURRENT,
      pageSize = INITIAL_PAGESIZE,
      total,
    } = pagination;
    const data = await service.queryPagedUserList(
      current ?? INITIAL_CURRENT,
      INITIAL_PAGESIZE
    );
    setPagination({ current, pageSize, total });
    setMockData([...data.rows]);
  };

  const handleFinish = async (values: any) => {
    const { name, age, sex, email } = values;
    const data = await service.editUser(
      {
        id: currentIndex.index,
        name,
        age,
        sex,
        email,
      },
      currentIndex.index
    );
    form.resetFields();
    setMockData([...data]);
    setModalVisible(false);
  };

  return (
    <>
      <Table
        dataSource={mockData}
        columns={columns}
        rowKey={(record) => record.id}
        onChange={handleChange}
        pagination={pagination}
      />
      <EditModal
        form={form}
        onFinish={handleFinish}
        setModalVisible={(visible) => setModalVisible(visible)}
        modalVisible={modalVisible}
      />
    </>
  );
};

export default UserTable;
