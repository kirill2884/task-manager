<script lang="ts">
    import type { Task } from "../../Types/Task";
    import TaskTable from "../tables/TaskTable.svelte";

    export let tasks: Task[] = [];
    export let selectedTask: Task | null = null;

</script>
  <TaskTable {tasks} {selectedTask}></TaskTable>



