import styles from './StudentCard.module.css';

export default function StudentCard({ student, onDelete }) {
  const isDeansLister = student.gwa <= 1.75;
  const isOnProbation = student.status === 'On Probation';

  const cardClassName = isOnProbation
    ? `${styles.card} ${styles.probation}`
    : styles.card;

  return (
    <div className={cardClassName}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.name}>{student.name}</h3>
          <p className={styles.course}>{student.course}</p>
        </div>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => onDelete(student.id)}
          title="Delete Student"
        >
          ✕
        </button>
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <span><strong>Year:</strong></span>
          <span>{student.yearLevel}</span>
        </div>
        <div className={styles.row}>
          <span><strong>Status:</strong></span>
          <span className={isOnProbation ? styles.probationText : ''}>
            {student.status}
          </span>
        </div>
        <div className={styles.row}>
          <span><strong>GWA:</strong></span>
          <span>{Number(student.gwa).toFixed(2)}</span>
        </div>
      </div>

      {isDeansLister && (
        <span className={styles.badge}>Dean's Lister</span>
      )}
    </div>
  );
}
