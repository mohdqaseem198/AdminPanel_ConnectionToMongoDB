'use client';
import { Provider } from "react-redux";
import {ReduxStore} from './ReduxStore';

export function Providers({children}){
    return <Provider store={ReduxStore}></Provider>
};