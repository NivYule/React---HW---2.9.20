import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

interface IProps {
    filterOperation: Function
    clearFilter: Function
}

export default function Filter(props: IProps) {
    const [filterValue, setFilterValue] = useState("")
    const { filterOperation, clearFilter } = props;
    console.log("filter render")
    return <div>
        <InputGroup>
            <FormControl
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setFilterValue(e.target.value)}
                value={filterValue}
                placeholder="Enter Text"
            />
            <Button variant="info" onClick={() => { filterOperation(filterValue) }}> Filter </Button>
            <Button variant="danger" onClick={() => {
                setFilterValue("");
                filterOperation("")
            }}> Clear Value </Button>
            <Button variant="secondary" onClick={()=>{clearFilter()}}> Clear Filter</Button>
        </InputGroup>
    </div>
}