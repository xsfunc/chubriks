import ReactFlow, { Background } from 'reactflow'
import { useUnit } from 'effector-react'
import { EyesNode } from '@/entities/node-eyes'
import { EffectsNode } from '@/entities/node-effects'
import 'reactflow/dist/style.css'

import { PatternNode } from '@/entities/node-pattern'
import { flowManager } from '@/shared/lib'
import { ResultNode } from '@/entities/node-result'
import { HeadNode } from '@/entities/node-head'
import { Controls } from '@/shared/ui/controls'

export const nodeTypes = {
  resultNode: ResultNode,
  headNode: HeadNode,
  eyesNode: EyesNode,
  effectsNode: EffectsNode,
  patternNode: PatternNode,
}

const options = { hideAttribution: true }

export function EditorPage() {
  const {
    nodes,
    edges,
    changeNodes,
    changeEdges,
    addEdge,
  } = useUnit(flowManager)

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
        <Controls/>
      </ReactFlow>
    </div>
  )
}
