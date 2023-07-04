import ReactFlow, { Background, Controls } from 'reactflow'
import { useUnit } from 'effector-react'
import { flowManager } from '@/entities/flow-manager'
import 'reactflow/dist/style.css'
import { TextNode } from '@/entities/node-text/ui'
import { ColorNode } from '@/entities/node-color/ui'
import { ResultNode } from '@/entities/node-result/ui'
import { HeadNode } from '@/entities/node-head/ui'
import { EyesNode } from '@/entities/node-eyes/ui'
import { EffectsNode } from '@/entities/node-effects/ui'
import { PatternNode } from '@/entities/node-pattern/ui'

export const nodeTypes = {
  textNode: TextNode,
  colorNode: ColorNode,
  resultNode: ResultNode,
  faceNode: HeadNode,
  eyesNode: EyesNode,
  effectsNode: EffectsNode,
  patternNode: PatternNode,
}

const options = { hideAttribution: true }

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
