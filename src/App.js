import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';

 
import 'reactflow/dist/style.css';
import TextUpdaterNode from './TextUpdaterNode';
import './text-updater-node.css';
import DropDownNode from './DropDownNode';
import WorkFlowLabelsEnum from './enums/WorkFlowLabelsEnum';
import WorkFlowConfigurationOptionsEnum from './enums/WorkFlowConfigurationOptionsEnum';
 
// const initialNodes = [
//       { id: '0', position: { x: 0, y: 0 }, type:'input' , data: { label: 'Create Work Order' } },
//       { id: '1', type: 'textUpdater', position: { x: 0, y: 200 }, data: { label:WorkFlowLabelsEnum.LOAD_TYPE, value: '',setFlowData }},
//       { id: '2', type: 'textUpdater', position: { x: 0, y: 400 }, data: { label:WorkFlowLabelsEnum.BUDGET, value: 0,setFlowData }},
     
//     ];
// const initialEdges = [{ id: 'e0-1', source: '0', target: '1' },{id:'e1-2', source:'1', target:'2'}];
const nodeTypes = { textUpdater: TextUpdaterNode,dropDownNode:DropDownNode };
 
const App= ()=> {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isDeleteNodeDisabled,setIsDeleteNodeDisabled]= useState(true);
  const [isFinishDisabled,setIsFinishDisabled]= useState(true);
  const [selectedConfiguration,setSelectedConfiguration]= useState('');
  const [flowData,setFlowData]= useState({});//we will be storing the values we are getting from the flow
  //{'LOAD_TYPE':LCL, 'BUDGET':5000, 'CONFIGURATION':[]}

  useEffect(()=>{
    const initialNodes = [
      { id: '0', position: { x: 0, y: 0 }, type:'input' , data: { label: 'Create Work Order' } },
      { id: '1', type: 'textUpdater', position: { x: 0, y: 200 }, data: { label:WorkFlowLabelsEnum.LOAD_TYPE, value: '',setFlowData }},
      { id: '2', type: 'textUpdater', position: { x: 0, y: 400 }, data: { label:WorkFlowLabelsEnum.BUDGET, value: 0,setFlowData }},
     
    ];
    const initialEdges = [{ id: 'e0-1', source: '0', target: '1' },{id:'e1-2', source:'1', target:'2'}];
    setNodes(initialNodes);
    setEdges(initialEdges);
  },[])
  useEffect(()=>{
    if(nodes.length>3) {
      setIsDeleteNodeDisabled(false); //logic needs to be changed 
      setIsFinishDisabled(false);
    }
    else {
      setIsDeleteNodeDisabled(true);
      setIsFinishDisabled(true);
    }
    console.log(edges);
  },[nodes])

  const defaultEdgeOptions = { animated: true };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const addConfigurationNode=()=>{
      setFlowData((prevData)=> {
        const newConfiguration= (WorkFlowLabelsEnum.CONFIGURATION in prevData)? 
                  [...prevData[WorkFlowLabelsEnum.CONFIGURATION],selectedConfiguration]:[selectedConfiguration] ;
        return ({...prevData,[WorkFlowLabelsEnum.CONFIGURATION]:newConfiguration})
      })
      //when we add new configuraion node the dropdown list in the last one needs to be disabled otherwise options will be same
      if(selectedConfiguration.length) nodes[nodes.length-1].data.editable=false; 

      const options=[...filterDropDownOptions];
      const newNode= {id:`${nodes.length}`,
      type:'dropDownNode', 
      position:{x:0, y:nodes[nodes.length-1].position.y+200}, 
      data:{label:WorkFlowLabelsEnum.CONFIGURATION,value:'',options,disabled:false,setSelectedConfiguration}  //when new node is added the last block needs to be blocked
    }
    const newEdge= {id:`e${nodes.length-1}-${nodes.length}`,source:`${nodes.length-1}`,target:`${nodes.length}`}
    setNodes((prevNodes)=> [...prevNodes,newNode]);
    setEdges((prevEdges)=> [...prevEdges,newEdge]);
    setSelectedConfiguration('');
 }
 const filterDropDownOptions=()=>{
    const availableConfigurations= Object.values(WorkFlowConfigurationOptionsEnum);
    const selectedConfigurations= [...flowData[WorkFlowLabelsEnum.CONFIGURATION]];
    selectedConfiguration.array.forEach(element => {
      availableConfigurations.filter((item)=> item===element)
    });
    return availableConfigurations;
 }
 const deleteConfigurationNode=()=>{
    setNodes((prevNodes)=>[...prevNodes.slice(0,-1)]);
    setEdges((prevEdges)=> [...prevEdges.slice(0,-1)]);
 }
 const saveWorkFlow=()=>{
  setFlowData((prevData)=> {
    const newConfiguration= (WorkFlowLabelsEnum.CONFIGURATION in prevData)? 
              [...prevData[WorkFlowLabelsEnum.CONFIGURATION],selectedConfiguration]:[selectedConfiguration] ;
    return ({...prevData,[WorkFlowLabelsEnum.CONFIGURATION]:newConfiguration})
  })

 }
 
  return (
    <div style={{display:'flex'}}>
      <div style={{ width: '100vw', height: '100vh'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
      />
      </div>
      <div>
        <button onClick={addConfigurationNode}>Add</button>
        <button onClick={deleteConfigurationNode} disabled={isDeleteNodeDisabled}>Delete</button>
        <button onClick={saveWorkFlow} disabled={isFinishDisabled}>Finish</button>
      </div>
    </div>
  );
}

export default App;