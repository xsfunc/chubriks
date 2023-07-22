import type { EyesProps } from '@/shared/lib'

export type UpdateParams = Partial<FaceElement>
export type UpdateEyesParams = Partial<EyesProps>

export interface FaceElement {
  variant: number
  size: number
  y: number
}
