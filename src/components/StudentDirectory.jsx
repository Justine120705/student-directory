import { useState } from 'react';
import { initialStudents } from '../data/students';
import StudentCard from './StudentCard';
import styles from './StudentDirectory.module.css';

export default function StudentDirectory() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const [formData, setFormData] = useState({
    name: '',
    course: '',
    yearLevel: 1,
    status: 'Regular',
    gwa: '',
  });

  // Combined live search + category filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (activeFilter === "Dean's Listers") {
      matchesFilter = student.gwa <= 1.75;
    } else if (activeFilter === 'On Probation') {
      matchesFilter = student.status === 'On Probation';
    }

    return matchesSearch && matchesFilter;
  });

  // Immutable addition (initialStudents is never mutated)
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.course || !formData.gwa) return;

    const newStudent = {
      id: Date.now(),
      name: formData.name,
      course: formData.course,
      yearLevel: Number(formData.yearLevel),
      status: formData.status,
      gwa: parseFloat(formData.gwa),
    };

    setStudents((prev) => [...prev, newStudent]);

    setFormData({
      name: '',
      course: '',
      yearLevel: 1,
      status: 'Regular',
      gwa: '',
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Student Directory</h1>

      {/* Add Student Form */}
      <form className={styles.form} onSubmit={handleAddStudent}>
        <h3>Add New Student</h3>
        <div className={styles.formGrid}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Course (e.g. BSCS)"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            required
          />
          <select
            value={formData.yearLevel}
            onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
          >
            <option value={1}>1st Year</option>
            <option value={2}>2nd Year</option>
            <option value={3}>3rd Year</option>
            <option value={4}>4th Year</option>
          </select>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Regular">Regular</option>
            <option value="Irregular">Irregular</option>
            <option value="On Probation">On Probation</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="GWA (e.g. 1.50)"
            value={formData.gwa}
            onChange={(e) => setFormData({ ...formData, gwa: e.target.value })}
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn}>Add Student</button>
      </form>

      {/* Search and Category Controls */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by name or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.filterButtons}>
          {['All', "Dean's Listers", 'On Probation'].map((category) => (
            <button
              key={category}
              type="button"
              className={activeFilter === category ? styles.activeFilter : styles.filterBtn}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Grid or Empty State */}
      {filteredStudents.length > 0 ? (
        <div className={styles.grid}>
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No students found matching your criteria.</p>
      )}
    </div>
  );
}
