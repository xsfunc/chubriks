import { deleteEffect } from '.'
import { DeleteButton } from '@/shared/ui/delete-button'

export function DeleteEffectButton({ id }) {
  return <DeleteButton onClick={() => deleteEffect(id)} />
}
