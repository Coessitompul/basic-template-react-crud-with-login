import { useSelector } from "react-redux";
import { SignedInPage } from "../guard/SignedInPage.jsx";

const AboutPage = () => {

    const userSelector = useSelector((state) => state.users);

    return (
        <SignedInPage>
            <main className="min-h-screen max-w-screen-lg mx-auto mt-8">
                <h1 className="text-2xl font-bold">About Page</h1>
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
                            userSelector.dataAllUsers.map((user, index) => {
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

export default AboutPage;