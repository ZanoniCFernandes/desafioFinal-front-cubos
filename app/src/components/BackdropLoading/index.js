import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import { styled } from "@mui/material/styles";

const BackdropStyled = styled(Backdrop)({
  zIndex: "100",
});

export default function BackdropLoading() {
  const { backdrop } = useCobrancas();

  return (
    <div>
      <BackdropStyled open={backdrop}>
        <CircularProgress sx={{ color: "#fff" }} />
      </BackdropStyled>
    </div>
  );
}
