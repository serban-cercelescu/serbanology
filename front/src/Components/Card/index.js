import React from 'react';

const Card = (props) => {
    const src = props.external ? props.pic : `/static/` + props.pic;
    return (
        <div
            style={{
                width: props.width,
                height: props.height,
                float: props.float && props.float !== "center" ? props.float : null,
                margin: props.float === "center" ? "auto" : "15px",
                padding: "5px",
                borderRadius: "7px",
                boxShadow: "3px 5px 5px 5px #999"
            }}
        >
            <div>
                <img
                    src={src}
                    alt={props.children}
                    style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "5px"
                    }}/>
            </div>
            <div style={{fontSize: "14px"}}>
                {props.children}
            </div>
        </div>
    );
}

export default Card;
