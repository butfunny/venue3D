import React from "react";

export class Layout extends React.Component {

    render() {
        return (
            <div className="layout">
                Hello World
                { this.props.children }
            </div>
        );
    }
}