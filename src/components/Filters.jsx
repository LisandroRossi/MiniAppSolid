export default function Filters(props) {
  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
      <button
        classList={{ active: props.filter === "all" }}
        onClick={() => props.onChange("all")}
      >
        Todos
      </button>
      <button
        classList={{ active: props.filter === "seen" }}
        onClick={() => props.onChange("seen")}
      >
        Vistos
      </button>
      <button
        classList={{ active: props.filter === "pending" }}
        onClick={() => props.onChange("pending")}
      >
        Pendientes
      </button>
    </div>
  );
}