import { Position } from 'reactflow'
import { useUnit } from 'effector-react'
import type { ChangeEvent } from 'react'
import { model } from '../model'
import type { EffectsNode as IEffectsNode } from '../types'
import { DropShadow } from './drop-shadow'
import { GrayScale } from './graysacle'
import { HueRotate } from './hue-rotate'
import { Sepia } from './sepia'
import { Invert } from './invert'
import { SvgBlurFilter } from './svg-blur'
import type { CssFilter, SvgFilter } from '@/shared/lib'
import { Handle, NodeCard } from '@/shared/ui'

const cssFiltersTypes = {
  dropShadow: DropShadow,
  grayscale: GrayScale,
  hueRotate: HueRotate,
  sepia: Sepia,
  invert: Invert,
}
const svgFiltersTypes = {
  blur: SvgBlurFilter,
}

interface SvgFilterProps {
  filtersType: 'svgFilters'
  filters: SvgFilter[]
}
interface CssFilterProps {
  filtersType: 'cssFilters'
  filters: CssFilter[]
}

type HandleChangeProps = (CssFilterProps | SvgFilterProps) & { filterId: string }

export function EffectsNode({ id, data }: IEffectsNode) {
  const { updateFilter } = useUnit(model)
  const handleChange = ({ filterId, filtersType, filters }: HandleChangeProps) =>
    (param: string) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        updateFilter({
          data: { [param]: event.target.value },
          nodeId: id,
          filtersType,
          filters,
          filterId,
        })
      }

  return (
    <NodeCard name='Effects'>
      {data.cssFilters.map((filter) => {
        const Filter = cssFiltersTypes[filter.type]
        return <Filter
          key={filter.id}
          onChange={handleChange({ filterId: filter.id, filters: data.cssFilters, filtersType: 'cssFilters' })}
          data={filter.data}
        />
      })}

      {data.svgFilters.map((filter) => {
        const Filter = svgFiltersTypes[filter.type]
        return <Filter
          key={filter.id}
          onChange={handleChange({ filterId: filter.id, filters: data.svgFilters, filtersType: 'svgFilters' })}
          data={filter.data}
        />
      })}

      <Handle type="source" position={Position.Right} id="main" />
    </NodeCard>
  )
}
