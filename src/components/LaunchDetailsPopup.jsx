import React from "react";
import { Pane, Table, Dialog, Badge } from 'evergreen-ui';
import Styled from "styled-components";
import { launchStatus, launchUTCFormetChanged } from "./Utils";


const StyledDialog = Styled(Dialog)`
    .ub-pb_24px{
        padding-bottom: 0;
    }
`;
const StyledRow = Styled(Table.Row)`
    border: none;
    border-bottom: 1px solid #c3baba;
    overflow-y:none;
    height: 2.6rem;
`;
const StyledBody = Styled.div`
    border: none;
`;
const StyledTable = Styled(Table)`
    padding: 0;
`;
const StyledMainDiv = Styled.div`
    display: flex;
`;
const MainDiv = Styled.div`
    color:#7b7b7b;
    font-family: "SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;
const StyledInnerDiv2 = Styled.div`
    padding-left:0.5rem;
    color:#7b7b7b;
    font-family: "SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;
const StyledInnerDiv3 = Styled.div`
    margin-left:1rem;
    padding-left:0.5rem;
    color:#7b7b7b;
    font-family: "SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

const LaunchDetailsPopup = ({ show, launch, onClose }) => {
  const { label, color } = launchStatus(launch);

  return (
    <MainDiv>
      <Pane>
        <StyledDialog
          isShown={show}
          onCloseComplete={() => onClose(false)}
          hasFooter={false}
        >
          <StyledMainDiv>
            <div>
              <img src={launch?.links?.mission_patch} height={40} alt="img" />
            </div>
            <StyledInnerDiv2>
              <p style={{ marginTop: 0 }}>{launch?.mission_name}</p>
              <p style={{ marginTop: 0 }}>{launch?.rocket?.rocket_name}</p>
            </StyledInnerDiv2>
            <StyledInnerDiv3>
              <Badge color={color}>{label}</Badge>
            </StyledInnerDiv3>
          </StyledMainDiv>
          <StyledInnerDiv2>
            <p>{launch?.mission_name} {launch?.details} <a href={launch?.links?.article_link}>Wikipedia</a></p>
          </StyledInnerDiv2>
          <StyledBody>
            <Pane>
              <StyledTable>
                <StyledBody>
                  <StyledRow>
                    <Table.TextCell>Flight Number</Table.TextCell>
                    <Table.TextCell>{launch?.flight_number}</Table.TextCell>
                  </StyledRow>
                  <StyledRow>
                    <Table.TextCell>Mission Name</Table.TextCell>
                    <Table.TextCell>{launch?.mission_name}</Table.TextCell>
                  </StyledRow>
                  <StyledRow>
                    <Table.TextCell>Rocket Type</Table.TextCell>
                    <Table.TextCell>{launch?.rocket?.rocket_type}</Table.TextCell>
                  </StyledRow>
                  <StyledRow>
                    <Table.TextCell>Rocket Name</Table.TextCell>
                    <Table.TextCell>{launch?.rocket?.rocket_name}</Table.TextCell>
                  </StyledRow>
                  <StyledRow>
                    <Table.TextCell>Manufacturer</Table.TextCell>
                    <Table.TextCell>{launch?.rocket?.second_stage?.payloads[0]?.manufacturer}</Table.TextCell>
                  </StyledRow>
                  <StyledRow>
                    <Table.TextCell>Nationality</Table.TextCell>
                    <Table.TextCell>{launch?.rocket?.second_stage?.payloads[0]?.nationality}</Table.TextCell>
                  </StyledRow>
                  <StyledRow>
                    <Table.TextCell>Launch Date</Table.TextCell>
                    <Table.TextCell>{launchUTCFormetChanged(launch?.launch_date_utc)}</Table.TextCell>
                  </StyledRow>
                  <StyledRow>
                    <Table.TextCell>Payload Type</Table.TextCell>
                    <Table.TextCell>{launch?.rocket?.second_stage?.payloads[0]?.payload_type}</Table.TextCell>
                  </StyledRow>
                  <StyledRow>
                    <Table.TextCell>Orbit</Table.TextCell>
                    <Table.TextCell>{launch?.rocket?.second_stage?.payloads[0]?.orbit}</Table.TextCell>
                  </StyledRow>
                  <StyledRow>
                    <Table.TextCell>Launch Site</Table.TextCell>
                    <Table.TextCell>{launch?.launch_site?.site_name}</Table.TextCell>
                  </StyledRow>
                </StyledBody>
              </StyledTable>
            </Pane>
          </StyledBody>

        </StyledDialog>
      </Pane>
    </MainDiv>
  )
};

export default LaunchDetailsPopup;