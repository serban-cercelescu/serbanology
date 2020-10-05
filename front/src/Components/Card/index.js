import React from 'react';

const Card = (props) => 
    <div
        style={{
            width: props.width,
            height: props.height,
            float: props.float,
            margin: "15px",
            padding: "5px",
            borderRadius: "7px",
            boxShadow: "3px 5px 5px 5px #999"
        }}
    >
        <div>
            <img
                src={props.pic}
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

export default Card;
