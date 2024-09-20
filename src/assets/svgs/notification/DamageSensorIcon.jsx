import React from "react";

const DamageSensorIcon = ({props}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={32}
        height={32}
        fill="none"
        {...props}
      >
        <path fill="url(#a)" d="M0 0h32v32H0z" />
        <defs>
          <pattern
            id="a"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox"
          >
            <use xlinkHref="#b" transform="scale(.00195)" />
          </pattern>
          <image
            xlinkHref="data:image/png;base64,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xP0+cDU2yBEREfFWiqXyLUg6kF0UADOAPwJL8dsql8qxtOW1jgPyY3h/qSoEBvPBrIaIiEiHNAW4FlhN9J1+W8fqlhimRPxeRUREct4RwMMk1+m3dbyCTcdrXZGIiEggedhit3S3vyVxvIUtvNNAQERExMMUUt/ylknHG1j2PhEREUlDT+AGoIHkO3PXoxG4FUveIyIiIntwIn557zPtWNfynkRERKQVhVjd+kaS77RDH03YjIbKI4uIiOxiOJaxLumOOurjFWBYoM9MREQkq00CVpF85xzXsRblDhARkRx3NLCV5DvluI9tqESviIjkqNOxAjxJd8ZJHTXAed6foog4UbIOkWTMAB7HFv7FYSVW0GgxVvlvK1YFECx/fk+seM4YrHLg0JjiagBOAp6N6fVEREQS0wV7Dh7l3fVsLE//x4AeDjH2wFL7XgvMiTjWNaiIj4iI5ICvEk1Huhz4MTA+gpgnAD8BVkQU+1ciiFlERCSjPE7YzvNd4CLieZxQCHwKmBv4PTwaQ+wiIiKJWkiYTnMltoguibU8ecAFhNu+uCDe8EVEROI3D7/Osg64hsx4bt4V+DlQj997mhd34CIiInF7APeOcjlwaPwh79FhWGyu7+u++EMWERGJ12dw6yQfAnonEG+qegMP4/beLkkgXhERkVgVAUtIr4O8CShIItg0FQC/J733thgVCRIRkRwxDUvEk0oHeVUyIXr5Iam9tyrssxAREckZBwJltN05VgKfTCq4AC7Ccv639f6WYZ+BiIhIzikBvgw8hW3rWwvMBK4E+iUYVyj9sRmM14F12LbBp4AvYe9dRERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERCRj5CUdgIgEMQo4CpgIjAUGA92AwoCvUQVsA5YCC4A5wEst/5+IiIjEZDJwLbAMaE7oqMcGAV8EekX7dkVERHJXHnAK8ArJdfptHdXA74CRUb15ERGRXDQVmEnyHf2ejjrgeuwRhIiIiDgqwqb6G0i+c0/nWAWcGMHnISIi0uGNBF4n+c7c9WgEfgoUBP5cREREOqyJ2F100p14iOMBoHPYj0dERKTjORjYSvIdd8jjWaAk5IckIiLSkYwB1pN8hx3F8RBhcxOIiIh0CL1Idl9/HMf1wT4tERGR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"
            id="b"
            width={512}
            height={512}
          />
        </defs>
      </svg>
    </>
  );
};

export default DamageSensorIcon;
