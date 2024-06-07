import React, { useRef, useImperativeHandle, useState } from 'react';
import "./CSS/UISvgButton.css";

const UISvgButton = React.forwardRef((props, ref) => {

    const path = props.path || "M45.506,33.532c-1.741-7.42-7.161-17.758-23.554-19.942V7.047c0-1.364-0.826-2.593-2.087-3.113c-1.261-0.521-2.712-0.229-3.675,0.737L1.305,19.63c-1.739,1.748-1.74,4.572-0.001,6.32L16.19,40.909c0.961,0.966,2.415,1.258,3.676,0.737c1.261-0.521,2.087-1.75,2.087-3.113v-6.331c5.593,0.007,13.656,0.743,19.392,4.313c0.953,0.594,2.168,0.555,3.08-0.101C45.335,35.762,45.763,34.624,45.506,33.532z"
    const fill = props.fill || "#FFF"
    const width = props.width || "40px"
    const height = props.height || "40px"

    return (
        <div id="ui-svg-button-container">
        <button id="d" onClick={props.onClick}>
            <svg fill ={fill} id="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"  
            width={width} height={height} viewBox="0 0 45.58 45.58" >
            <g><path d={path}/></g>
            </svg>
        </button>
    </div>
    );
});

export default UISvgButton;
