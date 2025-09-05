import React, { useState } from "react";
import { Select } from 'evergreen-ui';
import Styled from 'styled-components';
import { CiFilter } from "react-icons/ci";

const StyledSelect = Styled(Select)`
    .ub-color_474d66 {
        border:none;
    }

    .ub-w_100prcnt {
        width:10rem !important;
    }
`;

const Dropdown = ({ getSelectedOption }) => {
    const [selectedOption, setSelectedOption] = useState('all');

    const changeOption = (selected) => {
        setSelectedOption(selected.target.value);
        getSelectedOption(selected.target.value);
    }

    return <>
    {/* <CiFilter /> */}
        <StyledSelect value={selectedOption} onChange={changeOption}>
            <option value="all">All Launches</option>
            <option value="upcoming">Upcoming Launches</option>
            <option value="true">Successful Launches</option>
            <option value="false">Failed Launches</option>
        </StyledSelect>
    </>
};

export default Dropdown;