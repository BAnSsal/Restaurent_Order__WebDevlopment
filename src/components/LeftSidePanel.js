import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import CheckboxLabels from'./CheckBox.js';
import Typography from '@mui/material/Typography';

export default function FileSystemNavigator() {
  return (
    <Box sx={{ minHeight: 180, flexGrow: 1, minWidth: 100,maxWidth:250 }}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
       <TreeItem nodeId="All" label={
        <>
          
          <Typography component="span" variant="h6" fontWeight="bold">Menu</Typography>
        </>
      }>
  {/* Indian Cuisine */}
  <TreeItem nodeId="indian" label={<CheckboxLabels label="Indian" />}>
  <TreeItem nodeId="indian-pav-bhaji" label={<CheckboxLabels label="Pav Bhaji" />} />
  <TreeItem nodeId="indian-chole-bhature" label={<CheckboxLabels label="Chole Bhature" />} />
</TreeItem>
{/* Chinese Cuisine */}
<TreeItem nodeId="chinese" label={<CheckboxLabels label="Chinese" />}>
  <TreeItem nodeId="chinese-manchurian" label={<CheckboxLabels label="Manchurian" />} />
  <TreeItem nodeId="chinese-noodles" label={<CheckboxLabels label="Noodles" />} />
</TreeItem>
{/* Italian Cuisine */}
<TreeItem nodeId="italian" label={<CheckboxLabels label="Italian" />}>
  <TreeItem nodeId="italian-pizza" label={<CheckboxLabels label="Pizza" />} />
  <TreeItem nodeId="italian-pasta" label={<CheckboxLabels label="Pasta" />} />
</TreeItem>

</TreeItem>

      </TreeView>
    </Box>
  );
}