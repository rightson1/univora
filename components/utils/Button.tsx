import Image from "next/image";
// import { CustomButtonProps } from "@/types";
const Button = ({
  isDisabled,
  btnType,
  containerStyles,
  textStyles,
  title,
  rightIcon,
  handleClick,
}: {
  isDisabled?: boolean;
  btnType?: "button" | "submit" | "reset";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: React.ReactNode;
  handleClick?: () => void;
}) => (
  <button
    disabled={isDisabled}
    type={btnType || "button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
  >
    <span className={`flex-1 ${textStyles}`}>{title}</span>
    {rightIcon && rightIcon}
  </button>
);

export default Button;
