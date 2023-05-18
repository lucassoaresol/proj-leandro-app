import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { iChildren } from "../../interfaces";
import { useAuthContext, useModalContext } from "../../contexts";
import { EditProfile } from "./EditProfile";
import { EditPassword } from "./EditPassword";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";

interface iBasePageProfileProps extends iChildren {
  back?: string;
}

export const BasePageProfile = ({
  children,
  back = "-1",
}: iBasePageProfileProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userData } = useAuthContext();
  const {
    openMenu,
    handleOpenMenu,
    handleClick,
    anchorEl,
    handleOpenEditProfile,
    handleOpenEditPassword,
  } = useModalContext();

  return (
    <>
      <Box bgcolor={theme.palette.background.default}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            alignItems: "center",
          }}
        >
          <Box
            position="relative"
            component={Paper}
            width="100vw"
            maxWidth={600}
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            padding={theme.spacing(2)}
            paddingTop={theme.spacing(5)}
            paddingBottom={theme.spacing(13)}
            gap={theme.spacing(2)}
          >
            {children}
            {location.pathname !== "/" && (
              <Card
                sx={{
                  position: "absolute",
                  bottom: theme.spacing(2),
                  left: theme.spacing(2),
                }}
              >
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(`${back}`);
                  }}
                >
                  <CardContent
                    style={{ paddingBottom: 16 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: theme.spacing(2),
                    }}
                  >
                    <Avatar>
                      <ArrowBackIosNew />
                    </Avatar>
                    <Typography>Voltar</Typography>
                  </CardContent>
                </button>
              </Card>
            )}
            <Card
              sx={{
                position: "absolute",
                bottom: theme.spacing(2),
                right: theme.spacing(2),
              }}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClick}
              >
                <CardContent
                  style={{ paddingBottom: 16 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing(2),
                  }}
                >
                  <Avatar>{userData?.username[0].toUpperCase()}</Avatar>
                  <Typography>
                    {userData &&
                      userData.username[0].toUpperCase() +
                        userData.username.substring(1)}
                  </Typography>
                </CardContent>
              </button>
            </Card>
          </Box>
        </Container>
      </Box>
      <Menu
        onClose={handleOpenMenu}
        open={openMenu}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenEditProfile}>Editar Perfil</MenuItem>
        <MenuItem onClick={handleOpenEditPassword}>Editar Senha</MenuItem>
        <MenuItem onClick={logout}>Sair</MenuItem>
      </Menu>
      <EditProfile />
      <EditPassword />
    </>
  );
};
