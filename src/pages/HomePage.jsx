import { SignedInPage } from "../guard/SignedInPage.jsx";
import instanceAdmin from "../axios/axiosAdmin.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAllUsers } from "../store/slice/usersSlice.js";

const HomePage = () => {

    const [dataUsers, setDataUsers] = useState([]);
    const dispatch = useDispatch();

    const getUsers = async () => {
        try {
            const response = await instanceAdmin.get("/users");

            if(response.data.data.length > 0) {
                setDataUsers(response.data.data);
                dispatch(addAllUsers({data: response.data.data}))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <SignedInPage>
            <main className="min-h-screen max-w-screen-lg mx-auto mt-8">
                <h1 className="text-2xl font-bold">Home Page</h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            dataUsers.map((user, index) => {
                                return (
                                    <tr className="bg-base-200" key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.createdAt}</td>
                                        <td>{user.updatedAt}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </main>
        </SignedInPage>
    )
}

export default HomePage;