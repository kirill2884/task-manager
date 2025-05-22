document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-confirm-delete]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      const confirmed = confirm('Are you sure you want to delete this task?');
      if (!confirmed) {
        e.preventDefault();
      }
    });
  });
});