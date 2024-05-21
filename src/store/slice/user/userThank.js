// src/features/apiThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  userRequest,
  userSuccess,
  userFailure,
  userAdd,
  userEdit,
  userDelete,
} from './userSlice';

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const getUsers = createAsyncThunk(
  'api/users',
  async (_, { dispatch, signal}) => {
    dispatch(userRequest());
    try {
      const response = await fetch(API_URL, { signal });
      if (!response.ok) {
        throw new Error('Internal Server Error');
      }
      const data = await response.json();
      dispatch(userSuccess(data));
    } catch (error) {
      dispatch(userFailure(error.toString()));
    }
  }
);

export const addUser = createAsyncThunk(
  'api/userAdd',
  async (newData, { dispatch, signal}) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
        signal,
      });
      if (!response.ok) {
        throw new Error('Internal Server Error');
      }
      const data = await response.json();
      dispatch(userAdd(data));
    } catch (error) {
      dispatch(userFailure(error.toString()));
    }
  }
);

export const editUser = createAsyncThunk(
  'api/userEdit',
  async (updatedData, { dispatch, signal }) => {
    try {
      const response = await fetch(`${API_URL}/${updatedData?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
        signal,
      });
      if (!response.ok) {
        throw new Error('Internal Server Error');
      }
      const data = await response.json();
      dispatch(userEdit(data));
    } catch (error) {
      dispatch(userFailure(error.toString()));
    }
  }
);

export const deleteUser = createAsyncThunk(
  'api/userDelete',
  async (userId, { dispatch, signal }) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
        signal,
      });
      if(!response.ok) {
        throw new Error('Internal Server Error');
      }
      dispatch(userDelete(userId));
    } catch (error) {
      dispatch(userFailure(error.toString()));
    }
  }
);
