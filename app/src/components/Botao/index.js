import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ButtonStyled = styled(Button)({
  width: "16rem",
  height: "3.3rem",
  borderRadius: "10px",
  backgroundColor: "var(--rosa)",
  textTransform: "none",
  fontFamily: "'Nunito', sans-serif",
  fontSize: "1.8rem",
  "&:hover": {
    backgroundColor: "var(--rosa-escuro)",
    transform: "scale(1.01)",
  },
});

function StyledButton({ text, type, onClickFunction }) {
  return (
    <ButtonStyled
      variant="contained"
      onClick={onClickFunction}
      type={type}
      disableElevation
    >
      {text}
    </ButtonStyled>
  );
}

export default StyledButton;
