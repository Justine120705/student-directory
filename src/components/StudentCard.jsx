import styles from './StudentCard.module.css';

export default function StudentCard({ student }) {
  const { name, course, yearLevel, status, gwa } = student;

  const isOnProbation = status === 'On Probation';
  const isDeansLister = gwa <= 1.75;

  const cardClassName = isOnProbation
    ? `${styles.card} ${styles.probation}`
    : styles.card;

  return (
    <div className={cardClassName}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.course}>{course}</p>

      <div className={styles.row}>
        <span>Year Level</span>
        <span>{yearLevel}</span>
      </div>

      <div className={styles.row}>
        <span>Status</span>
        <span className={isOnProbation ? styles.probationText : undefined}>
          {isOnProbation ? 'On Probation' : status}
        </span>
      </div>

      <div className={styles.row}>
        <span>GWA</span>
        <span>{gwa.toFixed(2)}</span>
      </div>

      {isDeansLister && <span className={styles.badge}>Dean's Lister</span>}
    </div>
  );
}
