import { Badge, Box, ButtonBase, Divider, styled } from "@mui/material";
import { FC, Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FlexBox from "../../../components/FlexBox";
import { H6, Small, Tiny } from "../../../components/Typography";
import UkoAvatar from "../../../components/UkoAvatar";
import useAuth from "../../../hooks/useAuth";
import PopoverLayout from "./PopoverLayout";

// styled components
const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  padding: "5px 1rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary.light
        : theme.palette.divider,
  },
}));

const ProfilePopover: FC = () => {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleMenuItem = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Fragment>
      <ButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              width: 11,
              height: 11,
              right: "7%",
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "success.main",
            },
          }}
        >
          <UkoAvatar
            src={"/static/avatar/001-man.svg"}
            sx={{ width: 30, height: 30, ml: 1 }}
          />
        </Badge>
      </ButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center">
            <UkoAvatar
              src={"/static/avatar/001-man.svg"}
              sx={{ width: 35, height: 35 }}
            />

            <Box ml={1}>
              <H6>{"Bipin Khatiwada"}</H6>
              <Tiny display="block" fontWeight={500} color="text.disabled">
             "bipinkhatiwada5@gmail.com"
              </Tiny>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>
          <StyledSmall
            onClick={() => handleMenuItem("/dashboard/user-profile")}
          >
            Set Status
          </StyledSmall>

          <StyledSmall
            onClick={() => handleMenuItem("/dashboard/user-profile")}
          >
            Profile & Account
          </StyledSmall>

          <Divider sx={{ my: 1 }} />

          <StyledSmall
            onClick={() => {
              logout();
              toast.error("You Logout Successfully");
            }}
          >
            Sign Out
          </StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
