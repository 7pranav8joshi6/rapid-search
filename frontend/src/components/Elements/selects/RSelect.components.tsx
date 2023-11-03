import { Select } from "antd";

type RSelectProps = {
  value: string;
  placeHolder: string;
  label: string;
  options: any[];
  onChange: any;
  width?: string;
};

const RSelect = ({ ...props }: RSelectProps) => {
  return (
    <div
      style={{ display: "flex", alignItems: "start", flexDirection: "column" }}
    >
      <span
        style={{ fontSize: "0.7rem", fontWeight: 600, marginLeft: "0.5rem" }}
      >
        {props.label}
      </span>
      <Select
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeHolder}
        style={{ width: props.width ?? "300px" }}
        options={props.options}
      />
      {/* <span></span> */}
    </div>
  );
};

export default RSelect;
