import React from "react";
import styled from "styled-components";
import spacexLogo from "../assets/images/spacex_logo.png";

const ContainerStyle = styled.div`
    width: 100%;
    height: 3.5rem;
    justify-content: center;
    align-items: center;
    display: flex;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
    height:4rem;
`;

const Header = () => {

    return (
        <>
            <ContainerStyle>
                <Logo src={spacexLogo} alt="SpaceX..." />
            </ContainerStyle>
        </>
    );

};

export default Header;
