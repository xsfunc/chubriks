import { deleteEffect } from '.'
import { DeleteButton } from '@/shared/ui/delete-button'

export function DeleteGradientButton({ id }) {
  return <DeleteButton onClick={() => deleteEffect(id)} />
}
