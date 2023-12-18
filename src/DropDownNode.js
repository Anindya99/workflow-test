
import { Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import getValuesFromEnum from './utils/getValuesFromEnum';
import WorkFlowLabelsEnum from './enums/WorkFlowLabelsEnum';


function DropDownNode({ data, isConnectable=true }) {
  const [selectedValue, setSelectedValue]= useState(data.value);
  const handleChange = (event) => {
    if(event.target.value.length){
      const newConfiguration= [...data.flowData[WorkFlowLabelsEnum.CONFIGURATION],event.target.value];
      data.setFlowData((prevData)=> ({...prevData,[WorkFlowLabelsEnum.CONFIGURATION]:newConfiguration}));
      setSelectedValue(event.target.value);
    }
  };

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label htmlFor="mySelect">Choose an option:</label>
        <select
          id="mySelect"
          value={selectedValue}
          onChange={handleChange}
          style={{width:'150px'}}
        >
          
          <option value="">Choose an option</option>
          {data.options.map((option, index) => (
            <option key={index} value={option}>
              {getValuesFromEnum(option)}
            </option>
          ))}
        </select>
      </div>

      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      
    </div>

    
  );
}

export default DropDownNode;
