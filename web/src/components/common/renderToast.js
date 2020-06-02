import React from "react";
import Toast from "./Toast";

export default function renderToast(message) {
    if (message == undefined) {
        return <></>;
    }
    return <Toast message={message} key={new Date()} />;
}
