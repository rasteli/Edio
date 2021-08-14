import React from "react";

export default function DefaultElement(props) {
    return <p {...props.attributes}>{props.children}</p>;
}
