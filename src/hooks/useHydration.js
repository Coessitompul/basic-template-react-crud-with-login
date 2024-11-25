import { useDispatch } from "react-redux";
import { addAuthUsers } from "../store/slice/usersSlice.js";
import { useEffect, useState } from "react";

export const useHydration = () => {
    const dispatch = useDispatch();

    const [isHydrated, setIsHydrated] = useState(false);
    
    const hydrateAuth = async () => {
        try {
            let users = localStorage.getItem("users");

            if (!users) return;
            
            users = JSON.parse(users);

            dispatch(addAuthUsers({accessToken: users.accessToken}));
            setIsHydrated(true)
        } catch (err) {
            console.log(err)
        } finally {
            setIsHydrated(true)
        }
    };

    // supaya ketika setiap aplikasi kita di refresh akan melakukan pengecekan terlebih dahulu
    useEffect(() => {
        hydrateAuth()
    }, [])

    return {
        isHydrated: isHydrated,
    }
}