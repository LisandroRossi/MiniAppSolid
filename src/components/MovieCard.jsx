// src/components/MovieCard.jsx
import { Show } from "solid-js";

export default function MovieCard(props) {

  const movie = props.movie;


  const markSeen = () => {
    props.onChangeStatus(movie.id, "seen");
  };

  const markPending = () => {
    props.onChangeStatus(movie.id, "pending");
  };

  const remove = () => {
    props.onChangeStatus(movie.id, "none"); 
  };


  const posterUrl = movie.poster || "https://via.placeholder.com/300x445?text=No+Poster";
  const rating = movie.rating ?? movie.vote_average ?? "—";

  return (
    <div class="movie-card">
      <img class="poster" src={posterUrl} alt={movie.title} />
      <h3 class="title">{movie.title}</h3>
      <p class="rating">⭐ {rating}</p>

      <div class="btns">
        <button
          onClick={markSeen}
          classList={{
            btn: true,
            "seen-active": movie.status === "seen",
          }}
        >
          Vista
        </button>

        <button
          onClick={markPending}
          classList={{
            btn: true,
            "pending-active": movie.status === "pending",
          }}
        >
          Pendiente
        </button>

        <Show when={movie.status !== "none"}>
          <button onClick={remove} class="remove-btn" title="Quitar de guardadas">✖</button>
        </Show>
      </div>
    </div>
  );
}