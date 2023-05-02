import React from "react";

const Play = ({ size = 36, fill = "white" }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill={fill} height={size} width={size} viewBox="0 96 960 960" ><path d="M320 853V293l440 280-440 280Zm60-280Zm0 171 269-171-269-171v342Z" /></svg>;
}

export default Play;
