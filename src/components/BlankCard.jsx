import React from "react";

export default function BlankCard({header = null, body = null}) {
    return (
        <div class="box font-Roboto">
            <div class="box-body">
                {header && <div class="box-header !border-b-0 !p-0">
                    {header}
                </div>}
                {body}
            </div>
        </div>
    )
}