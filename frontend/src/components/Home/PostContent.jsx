import React from "react";

const PostContent = ({ username, content, isExpanded, onToggle }) => {
    const words = content.split(' ');
    const preview = words.slice(0, 7).join(' ');

    return (
        <div>
            <p className="text-lg">
                <span className="text-lg font-bold">{username} </span>
                {isExpanded ? content : preview}
                {words.length > 10 && (
                    <span>
                        {!isExpanded && '...'}
                        <button onClick={onToggle} className="text-blue-500">
                            {isExpanded ? ' Show Less' : ' Show More'}
                        </button>
                    </span>
                )}
            </p>
        </div>
    );
};
export default PostContent;
