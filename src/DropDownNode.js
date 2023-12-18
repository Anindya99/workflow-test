import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';


function DropDownNode({ data, isConnectable=true }) {
  // const [option,setOption]= useState(data.value);
  // const handleChange = (event) => {
    
  //   setOption(event.target.value);
  //   console.log("hello");
  //   console.log(option);
  //   data.setOption(event.target.value)
  // };

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

      {/* <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{data.label}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={option}
            label={data.label}
            onChange={handleChange}
        >
            <MenuItem value={'Assign carriers by cost'}>Assign carriers by cost</MenuItem>
            <MenuItem value={'Assign to all carriers'}>Assign to all carriers</MenuItem>
        </Select>
        </FormControl>
      </Box> */}

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      
    </div>

    
  );
}

export default DropDownNode;
