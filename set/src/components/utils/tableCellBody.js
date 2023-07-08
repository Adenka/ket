import React from "react";
import { TableCell } from "@mui/material";
import { useTheme } from "@emotion/react";

const TableCellBody = ({text, parity}) => {
    const theme = useTheme();

    return <TableCell
        align = "center"
        sx = {{
            fontFamily: "Prompt",
            fontSize: "min(1.5rem, 4vw)",
            backgroundColor: parity ? theme.palette.secondary.veryLight : theme.palette.secondary.light
        }}
    >
        {text}
    </TableCell>
}

export default TableCellBody;