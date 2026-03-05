import { DocumentStatus } from '@/types/document'
import styles from './StatusBadge.module.css'

interface Props {
  status: DocumentStatus
}

const labels: Record<DocumentStatus, string> = {
  PENDENTE: 'PENDENTE',
  ASSINADO: 'ASSINADO',
}

export function StatusBadge({ status }: Props) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className={styles.dot} />
      {labels[status]}
    </span>
  )
}
