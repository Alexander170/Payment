import { useStatusStore } from "./store";
import Status from "./status";
import Form from "./Form";

function App() {
  const { status } = useStatusStore();
  if (status !== "idle") return <Status value={status} />;
  return <Form />;
}

export default App;
