<script lang="ts">
  import type { Task } from '../../Types/Task';
  import { actions } from 'astro:actions';
  export let tasks: Task[] = [];
  export let selectedTask: Task | null = null;
  
</script>

<style>
  .selected {
    background-color: rgb(86, 153, 241);
  }
</style>

<table class="min-w-full divide-y divide-gray-200 border border-gray-300 mt-4">
  <thead class="bg-gray-200">
    <tr>
      <th class="p-2 font-medium text-left text-gray-800">Title</th>
      <th class="p-2 font-medium text-left text-gray-800">Description</th>
      <th class="p-2 font-medium text-left text-gray-800">Priority</th>
      <th class="p-2 font-medium text-left text-gray-800">Due Date</th>
      <th class="p-2 font-medium text-left text-gray-800">Status</th>
      <th class="p-2 font-medium text-left text-gray-800"></th>
      <th class="p-2 font-medium text-left text-gray-800"></th>
      <th class="p-2 font-medium text-left text-gray-800"></th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-100 bg-white">
    {#each tasks as task}
      <tr class:selected={task.id === selectedTask?.id}>
        <td class="p-2">{task.title}</td>
        <td class="p-2">{task.description}</td>
        <td class="p-2">{task.priority}</td>
        <td class="p-2">{new Date(task.dueDate).toLocaleDateString()}</td>
        <td class="p-2">{task.completed ? 'Completed' : 'Active'}</td>
        
        <td class="p-2 w-21">
          <form method="POST" action={actions.tasks.delete} data-confirm-delete>
            <input type="hidden" name="id" value={task.id} />
            <button type="submit" class="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">Delete</button>
          </form>
        </td>

        <td class="p-2 w-26">
          {#if !task.completed}
            <form method="POST" action={actions.tasks.complite}>
              <input type="hidden" name="id" value={task.id} />
              <button type="submit" class="px-3 py-1 text-sm font-medium text-white bg-green-700 rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">Complete</button>
            </form>
          {/if}
        </td>

        <td class="p-2 w-26">
          <form method="POST" action={actions.tasks.select}>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="title" value={task.title} />
            <input type="hidden" name="description" value={task.description} />
            <input type="hidden" name="priority" value={task.priority} />
            <input type="hidden" name="dueDate" value={task.dueDate} />
            <input type="hidden" name="completed" value={task.completed} />
            <button type="submit" class="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">Select</button>
          </form>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

