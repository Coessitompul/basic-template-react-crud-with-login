import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

// ini dibuat ketika user belum login tapi ingin mengkses halaman lain maka otomatis akan di redirect ke halaman login
export const SignedInPage = (props) => {
    const userSelector = useSelector((state) => state.users);

    if (!userSelector.id){
        // navigate ini digunakan untuk meredirect ke halaman home /
        return <Navigate to="/login" />
    }

    return props.children;
}

// dengan cara ini juga kita bisa melindungi halaman tertentu supaya tidak bisa di visit jika tidak memenuhi kriteria tertentu yang sudah kita tentukan

