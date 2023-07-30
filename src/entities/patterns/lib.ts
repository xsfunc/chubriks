import { drawApi } from '@/shared/lib'

export function handleColorChange(param: string) {
  return (event: React.ChangeEvent<HTMLInputElement>) =>
    updatePattern({
      id,
      data: {
        [param]: {
          id: Number(event.target.value),
          type: drawApi.fillingTypes.PALETTE,
        },
      },
    })
}
