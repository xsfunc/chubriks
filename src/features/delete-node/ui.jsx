import { deleteNode } from '.'
import { DeleteButton } from '@/shared/ui/delete-button'

export function DeleteNodeButton({ id }) {
  return <DeleteButton onClick={() => deleteNode(id)} />
}
