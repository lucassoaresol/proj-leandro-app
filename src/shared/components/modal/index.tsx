import { iChildren } from "../../interfaces";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

interface iModalGeneralProps extends iChildren {
  open: boolean;
  handleClose: () => void;
}

export const ModalGeneral = ({
  children,
  open,
  handleClose,
}: iModalGeneralProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};
