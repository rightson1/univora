import React from "react";

const School = ({
  params,
}: {
  params: {
    school: string;
  };
}) => {
  return <div>{params.school}</div>;
};

export default School;
