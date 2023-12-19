import { Handle, Position } from "reactflow";

const MessageNode=({data,isConnectable})=>{
    return (
        <div className="text-updater-node">
          <div>{data.message}</div>
          <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
      );
}
export default MessageNode;
