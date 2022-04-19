interface DialogProps
  extends React.DetailedHTMLProps<
      React.DialogHTMLAttributes<HTMLDialogElement>,
      HTMLDialogElement
    >,
    React.AriaAttributes {}

const Dialog = (props?: DialogProps): React.ReactElement<DialogProps> => {
  return (
    <dialog
      {...props}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {props?.children}
    </dialog>
  );
};

export default Dialog;
