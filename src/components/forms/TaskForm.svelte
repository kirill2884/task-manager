<script lang="ts">
  import { actions } from 'astro:actions';
  import type { Task } from '../../Types/Task';
  export let task: Task | null = null;

  let id = task?.id ?? null;
  let title = task?.title ?? '';
  let description = task?.description ?? '';
  let priority = task?.priority ?? 'LOW';
  let dueDate = task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';
  let isCompleted = task?.completed ?? false;

  const formAction = id ? actions.tasks.update : actions.tasks.create;
</script>

<form method="POST" action={formAction} class="space-y-6 p-6 bg-white shadow-lg rounded-md w-full max-w-2xl mx-auto">
  {#if id}
    <input type="hidden" name="id" value={id} />
  {/if}

  <div>
    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
    <input
      type="text"
      id="title"
      name="title"
      bind:value={title}
      placeholder="Task title"
      required
      class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
    />
  </div>

  <div>
    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
    <textarea
      id="description"
      name="description"
      bind:value={description}
      placeholder="Optional description"
      rows="6"
      class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
    ></textarea>
  </div>

  <div>
    <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
    <select
      id="priority"
      name="priority"
      bind:value={priority}
      class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
    >
      <option value="LOW">Low</option>
      <option value="MEDIUM">Medium</option>
      <option value="HIGH">High</option>
    </select>
  </div>

  <div>
    <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
    <input
      type="date"
      id="dueDate"
      name="dueDate"
      bind:value={dueDate}
      required
      class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
    />
  </div>

  <div class="flex items-center">
    <input
      type="checkbox"
      id="isCompleted"
      name="isCompleted"
      bind:checked={isCompleted}
      class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label for="isCompleted" class="ml-2 block text-sm text-gray-700">Completed</label>
  </div>

  <div>
    <button
      type="submit"
      class="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
      {id ? 'Update Task' : 'Add Task'}
    </button>
  </div>
</form>


