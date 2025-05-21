<script lang="ts">
  import { createEventDispatcher} from 'svelte';

  export let label: string;

  const dispatch = createEventDispatcher();

  function handleClick(event: MouseEvent) {
    dispatch('click', event);  
  }
</script>

<button on:click={handleClick} class="w-[200px] m-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-colors duration-300"
>  {label}
</button>

