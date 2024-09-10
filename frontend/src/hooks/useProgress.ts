import { useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';

export const useProgress = () => useContext(ProgressContext);
