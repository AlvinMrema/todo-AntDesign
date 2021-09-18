// import { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';

export default function InputForm(props) {
    // const [name, setName] = useState('');

    const { Title } = Typography;

    // function handleChange(e) {
    //     setName(e.target.value);
    // }

    function onFinish(value) {
        // e.preventDefault();
        if (value.taskName !== '') {
            props.addTask(value.taskName);
        }

        console.log(value)

        // setName('');
    }

    function onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <div className="label-wrapper">
                <Title level={2} htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </Title>
            </div>

            <Form.Item
                name="taskName"
                // onValuesChange={name}
            >
                <Input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="taskName"
                    autoComplete="off"
                    // value={name}
                    // onChange={handleChange}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className="btn btn__primary"
                    block
                >
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
}