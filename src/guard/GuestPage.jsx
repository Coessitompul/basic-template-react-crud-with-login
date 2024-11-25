import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

// ini dibuat ketika user sudah login dan ingin mengakses halaman login maka akan di arahkan ke halaman home
export const GuestPage = (props) => {
    const userSelector = useSelector((state) => state.users);

    if (userSelector.id){
        // navigate ini digunakan untuk meredirect ke halaman /
        return <Navigate to="/" />
    }

    return props.children;
}

// dengan cara ini juga kita bisa melindungi halaman tertentu supaya tidak bisa di visit jika tidak memenuhi kriteria tertentu yang sudah kita tentukan

