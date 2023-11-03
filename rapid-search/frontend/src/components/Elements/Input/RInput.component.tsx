import { Input } from "antd";
import React, { ChangeEvent } from "react";

type RinputProps = {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeHolder?: string;
  width?: string;
  type?: string;
};

const RInput = ({ ...props }: RinputProps) => {
  return (
    <div
      style={{ display: "flex", alignItems: "start", flexDirection: "column" }}
    >
      <span
        style={{ fontSize: "0.7rem", fontWeight: 600, marginLeft: "0.5rem" }}
      >
        {props.label}
      </span>
      <Input
        style={{ width: props.width ?? "300px" }}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeHolder}
        type={props.type ?? "text"}
        bordered
      />
      {/* <span></span> */}
    </div>
  );
};

export default RInput;
