import { Button, Form, FormInstance, Input, Modal } from "antd";

interface EditModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  form: FormInstance<any> | undefined;
  onFinish: (values: any) => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const EditModal = (props: EditModalProps) => {
  const { modalVisible, setModalVisible, form, onFinish } = props;

  return (
    <Modal
      title="Edit user"
      visible={modalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <Form form={form} onFinish={onFinish} {...formItemLayout}>
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="age"
          name="age"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="sex"
          name="sex"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end">
            <Button type="text" onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="ml-4">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
