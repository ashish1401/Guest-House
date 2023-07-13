import React from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

export const ManageCustomers = () => {
    const params = useParams()
    return (
        <div>
            <NavBar />
        </div>
    )
}
