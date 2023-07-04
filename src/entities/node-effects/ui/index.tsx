import { Handle, Position } from 'reactflow'
import { useUnit } from 'effector-react'
import type { ChangeEvent } from 'react'
import { model } from '../model'
import { DropShadow } from './drop-shadow'
import { GrayScale } from './graysacle'
import { HueRotate } from './hue-rotate'
import { Sepia } from './sepia'
import { Invert } from './invert'
import { SvgBlurFilter } from './svg-blur'
import type { CssFilter, SvgFilter } from '@/entities/node-result/model/types'
import type { EffectsNode as EffectsNodeType } from '@/entities/flow-manager/model/initialNodes.types'

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

interface HandleChangeProps {
  filterId: string
  filtersType: 'cssFilters' | 'svgFilters'
  filters: SvgFilter[] | CssFilter[]
}

export function EffectsNode({ id, data }: EffectsNodeType) {
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
    <div className="text-updater-node">
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

      <Handle type="source" position={Position.Right} id="filters" />
    </div>
  )
}
