import { Link } from 'react-router-dom'

const NotFoundPagePublic = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
            <p className="text-6xl font-semibold">404: Page not found!</p>
            <Link to="/">Back to home Public</Link>
        </div>
    );
};

export default NotFoundPagePublic;