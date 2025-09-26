export default function Filters(props) {
  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "10px", justifyContent: "center" }}>
      <button
        classList={{ active: props.filter === "all" }}
        onClick={() => props.onChange("all")}
      >
        Todos ({props.total})
      </button>

      <button
        classList={{ active: props.filter === "seen" }}
        onClick={() => props.onChange("seen")}
      >
        Vistos ({props.seen})
      </button>

      <button
        classList={{ active: props.filter === "pending" }}
        onClick={() => props.onChange("pending")}
      >
        Pendientes ({props.pending})
      </button>
    </div>
  );
}