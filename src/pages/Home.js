import React from 'react';
import './Home.css';
import createPhoto from '../Images/Create_IMG.png';
import playIMG from '../Images/Play_IMG.png';

const Home = () => {
    return (
        <>
            <div className="home-container">
                <h1 className="home-title">Welcome to <b>Quiz Builder!</b></h1>
                <h2 className="home-subtitle">Click 'Create' to get started or 'Play' if you've already created some quizzes.</h2>
                <h3 className="home-info">See 'Help' for more information.</h3>
            </div>

            <div className={'centerInfoContainer'}>
                <div className="image-text-container">
                    <div className="text">
                        <h2>Create A new Quiz!</h2>
                        <h3>Quizzes are securely stored within a robust Cloud-based database, ensuring their accessibility and reliability. This means that once you've meticulously crafted your quizzes, they are safeguarded within this virtual repository, poised and ready for whenever you need them. </h3>
                    </div>
                    <div className="image">
                        <img src={createPhoto} alt={'CreateIMG'}/>
                    </div>
                </div>
                <div className="image-text-container">
                    <div className="image">
                        <img src={playIMG} alt={'PlayIMG'}/>
                    </div>
                    <div className="text">
                        <h2>Play Your Quiz!</h2>
                        <h3>Browse through your personalized collection of quizzes, carefully curated and created by you, reflecting your unique interests and expertise. Each quiz is a testament to your creativity and knowledge, offering a diverse range of topics and challenges to explore.</h3>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;
