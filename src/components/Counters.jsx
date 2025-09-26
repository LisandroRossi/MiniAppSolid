export default function Counters(props) {
  return (
    <div style={{ marginTop: "10px" }}>
      <span>✅ Vistas: {props.seen}</span>
      <span style={{ marginLeft: "12px" }}>⏳ Pendientes: {props.pending}</span>
    </div>
  );
}
