import React from "react";
import { GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";

const ShortToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
            <GridToolbarExport csvOptions={{ fileName: 'Exportar' }} />
        </GridToolbarContainer>
    );
};

export default ShortToolbar;