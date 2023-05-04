import React from "react";

const Fullscreen = ({ size = 36, fill = "white" }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" height={size} fill={fill} viewBox="0 96 960 960"><path d="M200 856V663h60v133h133v60H200Zm0-367V296h193v60H260v133h-60Zm367 367v-60h133V663h60v193H567Zm133-367V356H567v-60h193v193h-60Z" /></svg>;
}

export default Fullscreen;
