

import React from 'react';
import styled from 'styled-components';



function Temp() {
  const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  margin-left: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PrimaryButton = styled(NavButton)`
  background-color: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;

const SecondaryButton = styled(NavButton)`
  background-color: #6c757d;
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;

const DangerButton = styled(NavButton)`
  background-color: #dc3545;
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;
  return (
    <Navbar>
      <h1>Logo</h1>
      <div>
        <PrimaryButton>Home</PrimaryButton>
        <SecondaryButton>About</SecondaryButton>
        <DangerButton>Contact</DangerButton>
      </div>
    </Navbar>
  );
}

export default Temp;