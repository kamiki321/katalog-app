import { GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

export const CustomGridToolbarContainer = () => {
    const csvOptions = { 
        delimiter: ';',
        utf8WithBom: true
    }
    const printOptions={
      hideFooter: true,
      hideToolbar: true,
    }
  return (
    <GridToolbarContainer>
        <GridToolbar options={csvOptions} />
    </GridToolbarContainer>
  )
}
