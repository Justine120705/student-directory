import { students } from './data/students';
import StudentDirectory from './components/StudentDirectory';

export default function App() {
  return <StudentDirectory students={students} />;
}
