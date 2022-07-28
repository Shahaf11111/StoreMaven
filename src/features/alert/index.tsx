import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useTimeout from "../../hooks/useTimeout";
import { hide, selectMessage, selectSeverity } from "./alert.slice";

export default function AlertBar() {
    const dispatch = useAppDispatch();
    const severity = useAppSelector(selectSeverity);
    const message = useAppSelector(selectMessage);

    useTimeout(() => dispatch(hide()), 3000);

    return (
        <Snackbar
            open={Boolean(message)}
            autoHideDuration={3000}
            onClose={() => dispatch(hide())}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    );

}