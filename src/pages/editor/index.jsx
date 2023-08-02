import ReactFlow, { Background, Panel } from 'reactflow'
import { useUnit } from 'effector-react'
import { Canvas } from '@/entities/canvas'
import { flowManager } from '@/shared/lib'
import { ResultNode } from '@/widgets/result-node'
import { HeadNode } from '@/widgets/head-node'
import { Controls } from '@/shared/ui'
import { AddNodeButton } from '@/features/add-node'
import { EffectsNode, effectsNodeDefault } from '@/widgets/effects-node'
import { PaletteNode } from '@/widgets/palette-node'
import { FaceNode } from '@/widgets/face-node/ui'
import { BackNode } from '@/widgets/back-node'
import { addEdge } from '@/features/add-edge'
import { PatternNode, patternNodeDefault } from '@/widgets/pattern-node'
import { GradientNode } from '@/widgets/gradient-node'
import 'reactflow/dist/style.css'
import './model'

const options = { hideAttribution: true }
const nodeTypes = {
  resultNode: ResultWithCanvas,
  headNode: HeadNode,
  faceNode: FaceNode,
  effectsNode: EffectsNode,
  patternNode: PatternNode,
  paletteNode: PaletteNode,
  backNode: BackNode,
  gradientNode: GradientNode,
}

const nodesToAdd = [
  {
    name: 'Pattern',
    initial: patternNodeDefault,
  },
  {
    name: 'Effects',
    initial: effectsNodeDefault,
  },
]

export function EditorPage() {
  const {
    nodes,
    edges,
    changeNodes,
    changeEdges,
    deleteEdge,
    onInit,
  } = useUnit(flowManager)

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        onInit={onInit}
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
          <AddNodeButton nodes={nodesToAdd} />
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
