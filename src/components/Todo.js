import { useState, useRef, useEffect } from 'react';
import { Button, Form, Input, Space } from "antd";

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(value) {
        // e.preventDefault();

        if (newName !== '') {
            props.editTask(props.id, newName);
            setNewName("");
            setEditing(false);
        }
    }

    const editingTemplate = (
        <Form
            name="editing"
            className="stack-small"
            onFinish={handleSubmit}
        >
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <Input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <Space size="middle">
                <Button
                    htmlType="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                    size="large"
                >
                    Cancel <span className="visually-hidden">renaming {props.name}</span>
                </Button>
                <Button
                    htmlType="submit"
                    size="large"
                    className="btn btn__primary todo-edit">
                    Save <span className="visually-hidden">new name for {props.name}</span>
                </Button>
            </Space>
        </Form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <Space size="middle">
                <Button
                    htmlType="button"
                    size="large"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </Button>
                <Button
                    type="primary"
                    size="large"
                    htmlType="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}
                    danger
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </Button>
            </Space>
        </div>
    );

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);

    return <li className="todo stack-small">{isEditing ? editingTemplate : viewTemplate}</li>;
}