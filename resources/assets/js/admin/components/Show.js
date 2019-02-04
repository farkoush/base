import React, { Component } from "react";

export class Show extends Component{
    render(){
        const list = this.props.data.map((d, i) => {
            return (
                <div className="mb-5" key={i}>
                    <strong>{d.label}:</strong> {d.value}
                </div>
            );
        });
        return (
            <div>
                {list}
            </div>
        );
    }
}