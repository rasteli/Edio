import React from "react";

export default function TitleElement(props) {
    return <h1 {...props.attributes}>{props.children}</h1>;
}
