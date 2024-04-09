import React from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../config/Firebase';
import { useGetUserInfo } from './useGetUserInfo';

export const useAddTransactions = () => {
    const transactionCollectionRef = collection(db, "projects");
    const { userID } = useGetUserInfo();

    const addTransactions = async ({ pname, startDate,endDate, status,techused }) => {
        try {
            await addDoc(transactionCollectionRef, {
                userID,
                pname,
                startDate,
                endDate,
                status,
                techused,
                createdAt: serverTimestamp()
            });
            console.log("Project added successfully.");
        } catch (error) {
            console.error("Error adding transaction: ", error);
        }
    }

    return { addTransactions };
}