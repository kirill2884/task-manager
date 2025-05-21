<script lang="ts">
  import { actions } from 'astro:actions';
  import type { Filter } from '../../Types/Filter';
  import { onMount } from 'svelte';

  export let filter:Filter|null = null

  let priority = filter?.priority;
  let completed = filter?.completed;

</script>

<form method="POST" action={actions.tasks.setFilter} class="space-y-4 p-4 bg-white shadow rounded-md w-full max-w-md mx-auto" on:submit|preventDefault>
  <div class="flex gap-4">
    <div class="flex flex-col">
      <label for="priority" class="text-gray-700">Priority</label>
      <select
        name="priority"
        class="p-2 border rounded"
      >
        <option value="ALL" selected={priority === undefined}>All</option>
        <option value="HIGH" selected={priority === 'HIGH'}>High</option>
        <option value="MEDIUM" selected={priority === 'MEDIUM'}>Medium</option>
        <option value="LOW" selected={priority === 'LOW'}>Low</option>
      </select>
    </div>

    <div class="flex flex-col">
      <label for="completed" class="text-gray-700">Completed</label>
      <select
        name="completed"
        class="p-2 border rounded"
      >
        <option value="ALL" selected={completed === undefined}>All</option>
        <option value="true" selected={completed === true}>Completed</option>
        <option value="false" selected={completed === false}>Not Completed</option>
      </select>
    </div>

    <button type="submit" class="p-2 bg-blue-500 text-white rounded mt-4">
      Apply Filters
    </button>
  </div>
</form>
