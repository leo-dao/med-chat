import React from 'react';
import styled from 'styled-components';
import { User } from '../../../interfaces/types';

const Selector = styled.select`
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const UserSelector = ({ value, onChange }: { value: User; onChange: (user: User) => void }) => {
    return (
        <Selector value={value} onChange={(e) => onChange(e.target.value as User)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        </Selector>
    );
    };

export default UserSelector;