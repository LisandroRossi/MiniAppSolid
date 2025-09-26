import { createSignal } from "solid-js";
import './searchbar.css';
export default function SearchBar(props) {
  const [value, setValue] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(value());
  };

  return (
    <form onSubmit={handleSubmit} class="search-form">
      <input
        type="text"
        placeholder="Buscar película..."
        value={value()}
        onInput={(e) => setValue(e.currentTarget.value)}
        class="search-input"
      />
      <button type="submit" class="search-button">Buscar</button>
    </form>
  );
}