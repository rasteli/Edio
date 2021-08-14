import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export default function QuoteElement(props) {
    return (
        <div {...props.attributes} id="quote">
            <FontAwesomeIcon id="icon" icon={faQuoteLeft} />
            {props.children}
        </div>
    );
}
