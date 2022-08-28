import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    style={{
      height: 200,
      width: 600,
      marginLeft: -10,
      marginTop: -15,
      transform: [{ rotateX: "180deg" }],
    }}
    // style={{
    //   transform: "rotate(180deg)",
    //   transition: ".3s",
    // }}
    viewBox="0 0 1440 490"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Defs>
      <LinearGradient id="a" x1={0} x2={0} y1={1} y2={0}>
        <Stop stopColor="rgba(81.427, 191.882, 255, 1)" offset="0%" />
        <Stop stopColor="rgba(119.395, 253.079, 130.8, 1)" offset="100%" />
      </LinearGradient>
    </Defs>
    <Path
      style={{
        transform: "translate(0,0)",
        opacity: 1,
      }}
      fill="url(#a)"
      d="m0 147 34.3 49C68.6 245 137 343 206 392c68.3 49 137 49 205 24.5 69-24.5 138-73.5 206-98 68.7-24.5 137-24.5 206-49 68.4-24.5 137-73.5 206-49C1097.1 245 1166 343 1234 392c68.9 49 137 49 206 40.8 68.6-7.8 137-24.8 206-98 68.3-73.8 137-203.8 205-228.6 69-24.2 138 56.8 206 122.5 68.7 65.3 137 114.3 206 122.5 68.4 7.8 137-24.2 206-57.2 68.1-33 137-65 205-65.3 68.9.3 137 32.3 206 65.3 68.6 33 137 65 206 57.2 68.3-8.2 137-57.2 205-89.9 69-32.3 138-49.3 206-89.8C3565.7 131 3634 65 3703 98c68.4 33 137 163 206 171.5 68.1 8.5 137-106.5 205-163.3 68.9-57.2 137-57.2 206 8.1 68.6 65.7 137 195.7 206 204.2 68.3 8.5 137-106.5 205-171.5 69-65 138-82 172-89.8l34.1-8.2v441H0Z"
    />
  </Svg>
);

export default SvgComponent;
