import ReactFlow, { Background, Controls } from 'reactflow'
import { useUnit } from 'effector-react'
import { flowManager } from '@/entities/flow-manager'
import { TextNode } from '@/entities/node-text/ui'
import { ResultNode } from '@/entities/node-result/ui'
import { ColorNode } from '@/entities/node-color/ui'
import 'reactflow/dist/style.css'
import { HeadNode } from '@/entities/node-head/ui'
import { EyesNode } from '@/entities/node-eyes/ui'
import { FiltersNode } from '@/entities/node-svg-filters/ui'
import { DebugNode } from '@/entities/debug-node/ui'

const options = { hideAttribution: true }

const nodeTypes = {
  textNode: TextNode,
  colorNode: ColorNode,
  resultNode: ResultNode,
  headNode: HeadNode,
  eyesNode: EyesNode,
  filtersNode: FiltersNode,
  debugNode: DebugNode,
}

export function Flow() {
  const { nodes, edges, changeNodes, changeEdges, addEdge } = useUnit(flowManager)
  return (
    <div style={{ height: '98vh', width: '98vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={changeNodes}
        onEdgesChange={changeEdges}
        onConnect={addEdge}
        proOptions={options}
        snapToGrid={false}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
