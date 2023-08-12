import type { GradientOptions, GradientSerialized } from './types'

export function serialize({ type, id, degree, colors, stops }: GradientOptions) {
  return [id, type, degree, colors, stops]
}

export function deserialize([id, type, degree, colors, stops]: GradientSerialized) {
  return { type, id, degree, colors, stops }
}

export function serializeGradients(gradients: GradientOptions[]) {
  return gradients.map(gradient => serialize(gradient))
}

export function deserializeGradients(gradients: GradientSerialized[]) {
  return gradients.map(gradient => deserialize(gradient))
}
