import { Button } from 'antd';

export default function FilterButton(props) {
    return (
        <Button
            type="primary"
            size="large"
            htmlType="button"
            className="btn toggle-btn"
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}
        >
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </Button>
    );
}