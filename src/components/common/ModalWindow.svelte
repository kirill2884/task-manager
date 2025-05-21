<script>
    export let onClose = () => {};
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
  <div class="bg-white p-6 rounded shadow-lg w-full max-w-xl relative">
    <button on:click={onClose} class="absolute top-0 right-0 text-gray-500 hover:text-black text-3xl p-1 rounded-full">
      &times;
    </button>
    <slot />
  </div>
</div>