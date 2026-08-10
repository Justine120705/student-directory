import StudentCard from './StudentCard';

export default function StudentDirectory({ students }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.25rem',
        padding: '2rem',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
