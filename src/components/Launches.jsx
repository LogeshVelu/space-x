import React, { useState } from "react";
import { Table, Badge, Pagination, Pane, Spinner, Select } from 'evergreen-ui';
import { launchUTCFormetChanged, launchStatus } from "./Utils";
import Styled from 'styled-components';
import { useQuery } from "@tanstack/react-query";
import { useFetchLaunchesData } from "../hooks/useFetchLaunchesData";
import Dropdown from "./Dropdown";
import LaunchDetailsPopup from "./LaunchDetailsPopup";
import DatePicker from "./DatePicker";
import { subDays } from 'date-fns';
import { SlCalender } from "react-icons/sl";

const StyledDiv = Styled.div`
    margin: 1rem 5rem 1rem 5rem;
    @media(max-width: 768px) {
        margin: .5rem 1rem 1rem .5rem;
    }
`;
const StyledRow = Styled(Table.Row)`
    overflow-y:none;
    height: 2.6rem;
`;
const StyledBody = Styled(Table.Body)`
    @media(max-width:768px){
            width: fit-content;
    }
`;

const StyledHead = Styled(Table.Head)`
    text-transform: capitalize;
    height: 2.5rem;

    @media(max-width:768px){
        width: max-content !important;
    }
`;

const StyledPagination = Styled(Pagination)`
    float: right;
`;
const StyledFilterContainer = Styled.div`
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 1fr;
    gap: 75%;
    margin: 1rem 0 1rem 0;

    @media (max-width: 768px) {
      gap: 20%;  
    }
`;
const StyledContainerNoData = Styled.div`
    display: flex;
    justify-content: center;
    align-item:center;
    color:#7b7b7b;
    margin-top:1rem;
    font-family: "SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

const StyledSelect = Styled(Select)`
        .ub-b-top_1px-solid-d8dae5 {
            border: none;
        }
`;

const StyledTable = Styled(Table)`
    @media (max-width: 768px) {
        overflow-x: auto;
  }
`;

function getFormattedDate(date = new Date()) {
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
}

const Launches = () => {
    const [launches, setLaunches] = useState([]);
    const [launch, setLaunch] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState({
        start: getFormattedDate(subDays(new Date(), 180)),
        end: getFormattedDate(new Date()),
    });
    
    const [datepickerLabel, setDatepickerLabel] = useState("Past 6 months");

    const limit = 12, offset = page * 10;

    const { data = { data: [], headers: {} }, isLoading } = useQuery({
        queryKey: ['launches', limit, offset, query],
        queryFn: () => useFetchLaunchesData(limit, offset, query)
    });

    let records = data.data;
    let totalPages = data?.headers['spacex-api-count'] <= 12 ? 1 : data?.headers['spacex-api-count'] || 1;

    const viewLaunchDetails = (_launch) => {
        setLaunch(_launch);
        setShowPopup(true);
    }
    const onClose = (_launch) => {
        setLaunch([]);
        setShowPopup(false);
    }

    const onCloseDatePicker = () => {
        setLaunch([]);
        setShowDatePicker(false);
    }

    const getSelectedDate = (selectedDateInfo) => {
        if (selectedDateInfo?.label !== "") {
            setDatepickerLabel(selectedDateInfo?.label);
        }
        setQuery(_query => {
            return {
                ..._query,
                start: getFormattedDate(selectedDateInfo.startDate),
                end: getFormattedDate(selectedDateInfo.endDate)
            }
        });
        setPage(0);

    }

    const getSelectedDropdownOption = (selected) => {

        setQuery(_query => {
            return {
                ..._query,
                launch_success: selected
            }
        });
        setPage(0);

    }

    const getPaginationInfo = (page) => {
        setPage(page)
    }

    let tableBodyHeight = records.length === 0 ? 440 : 'auto';

    return (
        <>
            <StyledDiv>
                <StyledFilterContainer>
                    <div  data-testid='timepicker' onClick={() => { setShowDatePicker(true); }}>
                        {/* <SlCalender /> */}
                        <StyledSelect defaultValue={datepickerLabel} name="timePicker" onChange={event => alert(event.target.value)}>
                            
                            <option>{ datepickerLabel}</option>
                        </StyledSelect>
                    </div>

                    <div data-testid='status-based-filter'><Dropdown  getSelectedOption={getSelectedDropdownOption} /></div>
                </StyledFilterContainer>

                <StyledTable>
                    <StyledHead>
                        <Table.TextHeaderCell>No:</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Launched (UTC)</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Location</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Mission</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Orbit</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Launch Status</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Rocket</Table.TextHeaderCell>
                    </StyledHead>
                    <StyledBody height={tableBodyHeight}>
                        {records && records.map((launch, index) => (
                            <StyledRow key={launch.id} isSelectable onSelect={() => { viewLaunchDetails(launch) }}>
                                <Table.TextCell>{page > 1 ? index + 1 + 12 * (page - 1) : index + 1}</Table.TextCell>
                                <Table.TextCell>{launchUTCFormetChanged(launch?.launch_date_utc)}</Table.TextCell>
                                <Table.TextCell>{launch?.launch_site?.site_name}</Table.TextCell>
                                <Table.TextCell>{launch.mission_name}</Table.TextCell>
                                <Table.TextCell>{launch?.rocket?.second_stage?.payloads[0]?.orbit}</Table.TextCell>
                                <Table.TextCell>
                                    {
                                        (() => {
                                            const { label, color } = launchStatus(launch);
                                            return <Badge color={color}>{label}</Badge>
                                        })()
                                    }
                                </Table.TextCell>
                                <Table.TextCell>{launch?.rocket?.rocket_name}</Table.TextCell>
                            </StyledRow>
                        ))}
                        {(records.length === 0 && !isLoading) && <StyledContainerNoData>No results found  for the specified filter</StyledContainerNoData>}
                        {isLoading && <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
                            <Spinner />
                        </Pane>}
                    </StyledBody>
                </StyledTable>
                <div>
                    {records.length > 0 && <StyledPagination onPageChange={getPaginationInfo} page={page || 1} totalPages={totalPages}></StyledPagination>}
                </div>
            </StyledDiv>
            {<LaunchDetailsPopup show={showPopup} launch={launch} onClose={onClose} />}
            {<DatePicker show={showDatePicker} onClose={onCloseDatePicker} onChange={getSelectedDate} />}
        </>
    )
};

export default Launches;