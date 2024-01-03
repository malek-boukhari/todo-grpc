import React, { JSX } from 'react';
import { Input } from 'antd';

function SearchTasks(props: any): JSX.Element {
    const { setTitle } = props;

    function onSearch(e: React.ChangeEvent<HTMLInputElement>): void {
        setTitle(e.target.value);
    }

    return (
        <div>
            <Input
                bordered={false}
                placeholder="Search tasks"
                onChange={(e) => onSearch(e)}
                style={{ marginBottom: 0 }}
            />
        </div>
    );
}

export default SearchTasks;
