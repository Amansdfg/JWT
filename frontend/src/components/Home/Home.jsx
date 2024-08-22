import HomePosts from "./HomePosts.jsx";
import Rec from "./Rec.jsx";

const Home = () => {
    return (
        <div className="min-h-svh px-12 py-10 flex  justify-center">
            <HomePosts/>
            <Rec/>
        </div>
    );
};

export default Home;
