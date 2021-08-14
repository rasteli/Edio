import React from "react";

export default function CodeElement(props) {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
}
