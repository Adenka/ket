import React from "react";
import { TableCell } from "@mui/material";
import { useTheme } from "@emotion/react";

const TableCellHead = (props) => {
    const theme = useTheme();

    return <TableCell
        align = "center"
        sx = {{
            fontFamily: "Prompt",
            fontSize: "1rem",
            backgroundColor: theme.palette.secondary.main
        }}
    >
        {props.text}
    </TableCell>
}

export default TableCellHead;