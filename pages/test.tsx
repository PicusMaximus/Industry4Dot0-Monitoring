export default {
  setup() {
    const text = ref("test");
    const items = ref<string[]>([]);

    const handleAdd = () => {
      items.value.push(text.value);
      text.value = "";
    };

    const handleInput = (event: Event) => {
      text.value = (event.target as HTMLInputElement).value;
    };

    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleAdd();
      }
    };

    return () => (
      <div class="flex flex-col">
        <div class="flex gap-2">
          <input
            class="flex-1 rounded border-2 border-primary-500 px-2 py-1"
            onChange={handleInput}
            value={text.value}
          />
          <button
            class="rounded bg-primary-500 px-2 py-1 text-white"
            onClick={handleAdd}
            onKeypress={handleEnter}
          >
            Add
          </button>
        </div>
        <ul class="flex flex-col">
          {items.value.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  },
} satisfies Component;
