import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import getValuesFromEnum from './utils/getValuesFromEnum';

function TextUpdaterNode({ data, isConnectable }) {
  const [inputValue,setInputValue]= useState(data.value);
  const onChange = useCallback((evt) => {
    setInputValue(evt.target.value);
  }, []);
  useEffect(()=>{ 
    data.setFlowData((prev)=> ({...prev,[data.label]:inputValue}))
  },[inputValue])

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">{getValuesFromEnum(data.label)}:</label>
        <input id="text" name="text" value={inputValue} onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;
