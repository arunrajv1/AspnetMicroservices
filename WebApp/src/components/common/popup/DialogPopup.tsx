import {
  Dialog,
  DialogBody,
  DialogTitle,
  DialogSurface,
  DialogActions,
  DialogTrigger,
} from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";

const DialogPopup = ({ onClose, onConfirmChoice, text, title }: any) => {
  const handleOkClick = (e: any) => {
    onConfirmChoice(true);
    onClose(false);
  };
  const onCloseModal = (e: any) => {
    onClose(false);
  };

  return (
    <Dialog open={true} onOpenChange={(e, data) => onCloseModal(e)}>
      <DialogSurface aria-label="label">
        <DialogTitle>{title}</DialogTitle>
        <DialogBody>{text}</DialogBody>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary" onClick={onCloseModal}>
              Cancel
            </Button>
          </DialogTrigger>
          <Button appearance="primary" onClick={handleOkClick}>
            Confirm
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
export default DialogPopup;
