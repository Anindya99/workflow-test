import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background, Controls } from 'reactflow';

 
import 'reactflow/dist/style.css';
import TextUpdaterNode from './NodeComponents/TextUpdaterNode';
import './NodeComponents/text-updater-node.css';
import DropDownNode from './NodeComponents/DropDownNode';
import WorkFlowLabelsEnum from './enums/WorkFlowLabelsEnum';
import WorkFlowConfigurationOptionsEnum from './enums/WorkFlowConfigurationOptionsEnum';
import MessageNode from './NodeComponents/MessageNode';
 
const nodeTypes = { textUpdater: TextUpdaterNode,dropDownNode:DropDownNode, messageNode:MessageNode };
 
const App= ()=> {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isDeleteNodeDisabled,setIsDeleteNodeDisabled]= useState(true);
  const [isFinishDisabled,setIsFinishDisabled]= useState(true);
  const [flowData,setFlowData]= useState({[WorkFlowLabelsEnum.CONFIGURATION]:[]});//we will be storing the values we are getting from the flow
  //{'LOAD_TYPE':LCL, 'BUDGET':5000, 'CONFIGURATION':[]}

  useEffect(()=>{
    const initialNodes = [
      { id: '0', type:'messageNode', position: { x: 300, y: 0 }, data: { message: 'Create Work Order' } },
      { id: '1', type: 'textUpdater', position: { x: 300, y: 200 }, data: { label:WorkFlowLabelsEnum.LOAD_TYPE, value: '',setFlowData }},
      { id: '2', type: 'textUpdater', position: { x: 300, y: 400 }, data: { label:WorkFlowLabelsEnum.BUDGET, value: 0,setFlowData }},
     
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
  },[nodes])
  
  const defaultEdgeOptions = { animated: true };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addConfigurationNode=()=>{
      //when we add new configuraion node the dropdown list in the last one needs to be disabled otherwise options will be same
    const options=filterDropDownOptions();
    const newNode= {
        id:`${nodes.length}`,
        type:'dropDownNode', 
        position:{x:300, y:nodes[nodes.length-1].position.y+200}, 
        data:{label:WorkFlowLabelsEnum.CONFIGURATION,value:'',options,disabled:false,flowData,setFlowData} 
      }
    const newEdge= {id:`e${nodes.length-1}-${nodes.length}`,source:`${nodes.length-1}`,target:`${nodes.length}`}
    if(flowData.CONFIGURATION.length){
        const lastConfigurationNode= nodes[nodes.length-1];
        lastConfigurationNode.data.disabled= true;
        setNodes((prevNodes)=> [...prevNodes.slice(0,-1), lastConfigurationNode,newNode]);
    }
    else  setNodes((prevNodes)=> [...prevNodes,newNode]);
    setEdges((prevEdges)=> [...prevEdges,newEdge]);
 }
 const filterDropDownOptions=()=>{
    const availableConfigurations= Object.values(WorkFlowConfigurationOptionsEnum);
    const previouslySelectedConfigurations= [...flowData[WorkFlowLabelsEnum.CONFIGURATION]];
  
    const newConfigurationOptions= availableConfigurations.filter((configuration)=> {
      let val=true;
      previouslySelectedConfigurations.forEach((item)=>{
        if(configuration===item) val=false;
      })
      return val;
    })
    return newConfigurationOptions;
 }
 const deleteConfigurationNode=()=>{
    if(flowData[WorkFlowLabelsEnum.CONFIGURATION].length>1){
        const lastConfigurationNode= nodes[nodes.length-2];
        lastConfigurationNode.data.disabled= false;
        setNodes((prevNodes)=> [...prevNodes.slice(0,-2), lastConfigurationNode]);
    } 
    else setNodes((prevNodes)=>[...prevNodes.slice(0,-1)]);
    setEdges((prevEdges)=> [...prevEdges.slice(0,-1)]);
    setFlowData((prevFlowData)=>{
      const prevConfigurations= prevFlowData[WorkFlowLabelsEnum.CONFIGURATION];
      return ({...prevFlowData,[WorkFlowLabelsEnum.CONFIGURATION]:prevConfigurations.slice(0,-1)});
    })
 }
 const saveWorkFlow=()=>{
  console.log(flowData)
}
//  useEffect(()=>{
//     console.log(flowData);
//  },[flowData])
//  useEffect(()=>{
//     console.log(nodes)
//  },[nodes])
//  useEffect(()=>{
//     console.log(edges)
//  },[edges])

//update add, delete and finish button logic
 
  return (
    <div style={{display:'flex'}}>
      <div style={{display:'flex', flexDirection:'column', gap:'20px', padding:'25px', border:'3px solid red'}}>
        <button onClick={addConfigurationNode}>Add</button>
        <button onClick={deleteConfigurationNode} disabled={isDeleteNodeDisabled}>Delete</button>
        <button onClick={saveWorkFlow} disabled={isFinishDisabled}>Finish</button>
      </div>
      <div style={{ width: '100vw', height: '100vh'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      </div>
    </div>
  );
}

export default App;