import React, { Component } from 'react';
import { render } from 'react-dom';

import { Pannellum } from "pannellum-react";


const Example = () => (
    <div>
        <Pannellum
            width="100%"
            height="800px"
            image={"https://archxstudio.com/wp-content/uploads/2021/04/Final_Panorama-1.webp"}
            // haov={180}
            // vaov={90}
            // vOffset={1}
            // pitch={10}
            // yaw={180}
            // hfov={110}
            // maxHfov={170}
            // minHfov={30}
            autoLoad
            author=""
            title=""
            orientationOnByDefault={false}
            compass
            draggable
            keyboardZoom
            mouseZoom
            preview=""
            previewAuthor=""
            previewTitle=""
            showControls
            showFullscreenCtrl
            showZoomCtrl
            hotspotDebug={false}
            onLoad={() => {
                console.log("panorama loaded");
            }}
            onError={err => {
                console.log("Error", err);
            }}
            onErrorcleared={() => {
                console.log("Error Cleared");
            }}
            onMousedown={evt => {
                console.log("Mouse Down", evt);
            }}
            onMouseup={evt => {
                console.log("Mouse Up", evt);
            }}
            onTouchstart={evt => {
                console.log("Touch Start", evt);
            }}
            onTouchend={evt => {
                console.log("Touch End", evt);
            }}
        >

        </Pannellum>


    </div>
);

export default Example;