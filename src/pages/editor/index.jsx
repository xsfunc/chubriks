import ReactFlow, { Background } from 'reactflow'
import { useUnit } from 'effector-react'
import { EyesNode } from '@/entities/node-eyes'
import { EffectsNode } from '@/entities/node-effects'
import { PatternNode } from '@/entities/node-pattern'
import { Canvas } from '@/entities/canvas'
import { flowManager } from '@/shared/lib'
import { ResultNode } from '@/entities/node-result'
import { HeadNode } from '@/entities/node-head'
import { Controls } from '@/shared/ui'
import { NoseNode } from '@/entities/node-nose'
import { MouthNode } from '@/entities/node-mouth'

import 'reactflow/dist/style.css'
import './model'

const nodeTypes = {
  resultNode: ResultWithCanvas,
  headNode: HeadNode,
  eyesNode: EyesNode,
  noseNode: NoseNode,
  mouthNode: MouthNode,
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
    <div style={{ height: '100vh', width: '100vw' }}>
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

function ResultWithCanvas() {
  return <ResultNode >
    <Canvas style={{ width: '100%', height: '100%' }} />
  </ResultNode>
}
