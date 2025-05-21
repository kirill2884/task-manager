<script lang="ts">
    import CommonButton from "../common/CommonButton.svelte";
    import ModalWindow from "../common/ModalWindow.svelte";
    import TaskForm from "./TaskForm.svelte";
    import type { Task } from "../../Types/Task";
    import { actions } from "astro:actions";

    export let label: string = "Button";
    export let isUpdate: boolean = false;  
    
    let isOpenModal = false
    let selectedTask: Task | null = null;

    const clickButton = async () => {       
        if (isUpdate) {
            try {
                const result = await actions.tasks.getSelected({});
                if (result.data && result.data.task) {
                    selectedTask = result.data.task;
                } 
            } catch (error) {
                throw new Error(`Error getting selected task: ${error}`);
            }
        }
        isOpenModal = true;
    }

    const closeModal = () => {
        isOpenModal = false
    }

</script>

<CommonButton label={label} on:click={clickButton} />
{#if isOpenModal}
  <ModalWindow onClose={closeModal}>
    <TaskForm task={selectedTask || null} />
  </ModalWindow>
{/if}