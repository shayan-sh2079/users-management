interface Props {
  onClose?: () => void;
  children: React.ReactNode;
}

const ModalWrapper = (props: Props) => {
  return (
    <div role={"presentation"} className={"z-50"}>
      <div
        className={"fixed inset-0 bg-stone-950/50"}
        onClick={props.onClose}
      />
      <div
        className={
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-stone-50 shadow-lg"
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default ModalWrapper;
