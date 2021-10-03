import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store'
import { useLocation } from 'react-router-dom';

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useHashQuery = () => {
  return new URLSearchParams(useLocation().hash.substring(1));
}
