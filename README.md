## Technical task
Create a React SPA to fetch and display the tasks using the following API: `https://adam-deleteme.s3.amazonaws.com/tasks.json`

## Requirements
There should be 2 pages: task list (initial state) and task details page

### Task list page
1. Tasks should be fetched via API initially but stored in a local state. Refetching only required on page refresh, i.e. initial load
1. It should be possible to filter tasks by search term which should work both for task name and task description
1. Filtering should modify the url so that it's possible to navigate to a url with specific filters applied
1. It should be possible to navigate to a particular task page and back to list (you can decide where to put the action buttons and how they look)
1. If refreshed, should refetch the task list

### Task details page
1. It should be possible to edit task name/description, which would be updated in the local state
1. It should be possible to delete a task. That should delete it from local state and take user back to list
1. If refreshed, should refetch the task list and display task details based on route params

### General
1. Ensure appropriate error handling is present
1. Demonstrate and create unit tests as necessary
1. Think about scenarios which would need to be covered by e2e tests (no need to actually write the e2e tests unless you are really eager)

### Bonus points
1. If you use Typescript
1. If you use SASS
1. Ability to group tasks by type via a toggle (or just a checkbox). When grouped, task list page should show 4 collapsed task type groups, which would expand to show relevant tasks on click
1. Loading indicators
1. Task type icons
1. If you make your design responsive (think what could work better for big screen vs small screen)
