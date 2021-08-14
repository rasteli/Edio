import React from "react";

export default function LinkElement(props) {
    return (
        <div>
            <a {...props.attributes} href={props.element.href} id="link">
                {props.children}
            </a>
        </div>
    );
}
