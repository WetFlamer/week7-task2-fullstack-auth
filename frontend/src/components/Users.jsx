import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/usersSlice';

const Users = () => {

    const dispatch = useDispatch();

    const users = useSelector((initialState) => initialState.users.users)


    useEffect(() => {
        dispatch(fetchUsers());

    }, [dispatch])



    return (
        <div>
            {users.map((item) => {
                return <div key={item._id}>{item.login}</div>
            })}
        </div>
    );
};

export default Users;