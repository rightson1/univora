export const T_Input = ({
  type,
  handleChange,
  sx,
  placeholder,
}: {
  type: "text" | "password" | "email" | "number";
  sx?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  return (
    <input
      className={`outline-none border-none bg-none ${sx}`}
      placeholder={placeholder}
      onChange={handleChange}
      type={type}
    />
  );
};
