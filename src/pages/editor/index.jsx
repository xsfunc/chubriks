import ReactFlow, { Background, Panel } from 'reactflow'
import { useUnit } from 'effector-react'
import { PatternNode } from '@/entities/node-pattern'
import { Canvas } from '@/entities/canvas'
import { flowManager } from '@/shared/lib'
import { ResultNode } from '@/widgets/result-node'
import { HeadNode } from '@/entities/node-head'
import { Controls } from '@/shared/ui'
import { AddNodeButton } from '@/features/add-node'
import { EffectsNode } from '@/widgets/effects-node'
import { PaletteNode } from '@/widgets/palette-node'
import { FaceNode } from '@/widgets/face-node/ui'
import { BackNode } from '@/widgets/back-node'
import { addEdge } from '@/features/add-edge'
import 'reactflow/dist/style.css'
import './model'

const nodeTypes = {
  resultNode: ResultWithCanvas,
  headNode: HeadNode,
  faceNode: FaceNode,
  effectsNode: EffectsNode,
  patternNode: PatternNode,
  paletteNode: PaletteNode,
  backNode: BackNode,
}

const options = { hideAttribution: true }

export function EditorPage() {
  const {
    nodes,
    edges,
    changeNodes,
    changeEdges,
    deleteEdge,
  } = useUnit(flowManager)

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={changeNodes}
        onEdgesChange={changeEdges}
        onEdgesDelete={deleteEdge}
        onConnect={addEdge}
        proOptions={options}
        snapToGrid={false}
        deleteKeyCode={['Delete', 'Backspace']}
      >
        <Controls />
        <Panel position="bottom-center">
          <AddNodeButton/>
        </Panel>
        <Background />
      </ReactFlow>
    </div>
  )
}

function ResultWithCanvas() {
  return <ResultNode >
    <Canvas style={{ width: '100%', height: '100%', marginBottom: '10px' }} />
  </ResultNode>
}
