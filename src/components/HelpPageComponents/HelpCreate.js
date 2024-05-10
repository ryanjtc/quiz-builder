import React from 'react';

const HelpCreate = () => {
    return (
        <div>
            <h1>Creating a quiz:</h1>
            <p>Click on the 'Create' tab in the navigation and you will be taken to a form where you can enter the following things:</p>
            <ul>
                <li>Title</li>
                <li>Question</li>
                <li>4 Options</li>
                <li>The Correct Answer</li>
            </ul>
            <p>Once you press submit, this information is sent to a cloud database where it can be retrieved. You will now be able to play your newly created quiz by clicking the 'Play' tab in the navigation and selecting the associated title.</p>
        </div>
    );
};

export default HelpCreate;