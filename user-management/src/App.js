import './App.css';
import UsersList from './components/UserList';

function App() {
  return (
     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>User Management App</h1>
      <UsersList />
    </div>
  );
}

export default App;
