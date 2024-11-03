import axios from 'axios';
import { Group } from '../types/Game';

const BASE_URL = import.meta.env.VITE_API_URL;

export const updateGroup = async (
  groupId: number,
  updatedGroup: Partial<Group>,
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/groups/${groupId}`,
      { updatedGroup },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
};

export const deleteGroup = async (groupId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};
