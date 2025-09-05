import React, { useState } from "react";
import { Select } from 'evergreen-ui';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
    .ub-color_474d66 {
        border:none;
    }

    .ub-w_100prcnt {
        width:4rem !important;
    }
`;

const Dropdown = ({ getSelectedOption }) => {
    const [selectedOption, setSelectedOption] = useState('all');

    const changeOption = (selected) => {
        setSelectedOption(selected.target.value);
        getSelectedOption(selected.target.value);
    }

    return <>
        <StyledSelect value={selectedOption} onChange={changeOption}>
            <option value="all">All Launches</option>
            <option value="upcoming">Upcoming Launches</option>
            <option value="true">Successful Launches</option>
            <option value="false">Failed Launches</option>
        </StyledSelect>
    </>
};

export default Dropdown;