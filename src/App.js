import IndexComponent from "./component";
import {AuthProvider} from './component/useAuth';

function App() {
  return (
    <AuthProvider>
      <IndexComponent/>
    </AuthProvider>
  );
}

export default App;
