import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

interface IProps {
    filterOperation?: any
}

export default function ServerFilter(props: IProps) {
    const [value, setValue] = useState("")
    const { filterOperation } = props;
    return <div>
        <InputGroup>
            <FormControl
                aria-label="Filter"
                aria-describedby="basic-addon1"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder="Enter Name/Title"
            />
            <Button variant="info" onClick={() => { filterOperation(value) }}> Add Movies From Server </Button>
        </InputGroup>
    </div>
}