import React from "react";

export default function Leaf(props) {
    const style = {
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "none",
    };
    return (
        <span {...props.attributes} style={style}>
            {props.children}
        </span>
    );
}
