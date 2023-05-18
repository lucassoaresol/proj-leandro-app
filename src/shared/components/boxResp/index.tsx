import { Box, useMediaQuery } from "@mui/material";
import { iChildren } from "../../interfaces";

export const BoxResp = ({ children }: iChildren) => {
  const matches = useMediaQuery("(max-width:305px)");
  if (matches) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        width="80vw"
      >
        {children}
      </Box>
    );
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {children}
    </Box>
  );
};
