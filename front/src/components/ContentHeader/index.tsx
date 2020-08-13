import React from 'react';

import './styles.css';

interface ContentHeaderProps  {
    title: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = (props) => {
    return (
        <div className="section-header">
            <div className="section-header-left">
                <h1>{props.title}</h1>
            </div>
            <div className="section-header-right">
                {props.children}
            </div>
        </div>
    );
}

export default ContentHeader