import React from "react";
import RenderResourceList from "../../common/RenderResourceList";

export default function TaskList() {
    let placeholderid = "5ed04597ac20955958395022";
    let request = `tasks/list/${placeholderid}`;
    return (
        <div>
            <RenderResourceList resource={request} />
        </div>
    );
}
