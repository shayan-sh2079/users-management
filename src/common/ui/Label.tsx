interface Props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const Label = ({ label, error, className, children, ...props }: Props) => {
  return (
    <label
      {...props}
      className={
        "flex flex-col gap-1 text-sm font-semibold italic " + className
      }
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <p className={"ml-2"}>{label}</p>
      {children}
      {error && <p className={"ml-2 text-red-400"}>{error}</p>}
    </label>
  );
};

export default Label;
