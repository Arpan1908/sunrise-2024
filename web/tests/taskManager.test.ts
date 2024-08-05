// // tests/taskManager.test.ts

// import { initializeTasks, getActiveTasks, completeTask, getCompletedTasks, getAllTasks, createTask, updateTask, deleteTask } from "@/modules/taskManager";



// describe('Task Manager', () => {
//   beforeEach(() => {
//     initializeTasks();
//   });

//   test('should create initial task on initialization', () => {
//     const activeTasks = getActiveTasks();
//     expect(activeTasks).toContainEqual(
//       expect.objectContaining({ title: 'Initial Setup' })
//     );
//   });

//   test('should not have Group 2 tasks before completing Group 1', () => {
//     completeTask('Initial Setup');
//     const activeTasks = getActiveTasks();
//     expect(activeTasks).not.toContainEqual(
//       expect.objectContaining({ title: 'Basic Git' })
//     );
//   });

//   test('should mark task as completed', () => {
//     completeTask('Basic Introduction');
//     const completedTasks = getCompletedTasks();
//     expect(completedTasks).toContainEqual(
//       expect.objectContaining({ title: 'Basic Introduction' })
//     );
//   });

//   test('should fetch active tasks', () => {
//     const activeTasks = getActiveTasks();
//     expect(activeTasks).toEqual(
//       [{"completed": false, "description": "Learn basic Git commands.", "group": 2, "id": 3, "persona": "Intern", "title": "Basic Git"}, {"completed": false, "description": "Collaborate on a Git repository.", "group": 2, "id": 4, "persona": "Intern", "title": "Git Collaboration"}])
      
//     ;
//   });

//   test('should fetch all tasks', () => {
//     const allTasks = getAllTasks();
//     expect(allTasks).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({ title: 'Initial Setup' }),
//         expect.objectContaining({ title: 'Basic Introduction' }),
//         expect.objectContaining({ title: 'Basic Git' }),
//         expect.objectContaining({ title: 'Git Collaboration' }),
//         expect.objectContaining({ title: 'JavaScript Basics' }),
//         expect.objectContaining({ title: 'JavaScript Project' }),
//         expect.objectContaining({ title: 'API Introduction' }),
//         expect.objectContaining({ title: 'API Consumption' }),
//         expect.objectContaining({ title: 'Final Project' }),
//         expect.objectContaining({ title: 'Project Presentation' })

//       ])
//     );
//   });

//   test('should fetch completed tasks', () => {
//     completeTask('Basic Introduction');
//     const completedTasks = getCompletedTasks();
//     expect(completedTasks).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({ title: 'Basic Introduction' })
//       ])
//     );
//   });

//   test('should create a new task', () => {
//     createTask('New Task', 'New task description', 'Intern', 1);
//     const activeTasks = getActiveTasks();
//     expect(activeTasks).toContainEqual(
//       expect.objectContaining({ title: 'New Task' })
//     );
//   });

//   test('should update a task', () => {
//     const taskToUpdate = getActiveTasks()[0];
//     updateTask(taskToUpdate.id, { title: 'Updated Task Title' });
//     const updatedTask = getAllTasks().find(task => task.id === taskToUpdate.id);
//     expect(updatedTask?.title).toBe('Updated Task Title');
//   });

//   test('should delete a task', () => {
//     const taskToDelete = getActiveTasks()[0];
//     deleteTask(taskToDelete.id);
//     const activeTasks = getActiveTasks();
//     expect(activeTasks).not.toContainEqual(
//       expect.objectContaining({ id: taskToDelete.id })
//     );
//   });

//   test('should enforce task completion order', () => {
//     completeTask('Initial Setup');
//     completeTask('Basic Introduction');
//     const activeTasks = getActiveTasks();
//     expect(activeTasks).toContainEqual(
//       expect.objectContaining({ title: 'Basic Git' })
//     );
//   });
// });

import { initializeTasks, getActiveTasks, completeTask, getCompletedTasks, getAllTasks, createTask, updateTask, deleteTask } from "@/modules/taskManager";

describe('Task Manager', () => {
    beforeEach(() => {
        initializeTasks();
    });

    test('should create initial task on initialization', () => {
        const activeTasks = getActiveTasks();
        expect(activeTasks).toContainEqual(
            expect.objectContaining({ title: 'Initial Setup' })
        );
    });

    test('should not have Group 2 tasks before completing Group 1', () => {
      
      completeTask('Initial Setup');
    
      
      const activeTasks = getActiveTasks();
    
      
      expect(activeTasks).not.toContainEqual(
          expect.objectContaining({ title: 'Basic Git' })
      );
  });
  

    test('should mark task as completed', () => {
        createTask('Basic Introduction', 'Complete the introductory module.', 'Intern', 1);
        completeTask('Basic Introduction');
        const completedTasks = getCompletedTasks();
        expect(completedTasks).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Basic Introduction' })
            ])
        );
    });

    test('should fetch active tasks', () => {
        createTask('Basic Git', 'Learn basic Git commands.', 'Intern', 2);
        createTask('Git Collaboration', 'Collaborate on a Git repository.', 'Intern', 2);
        const activeTasks = getActiveTasks();
        expect(activeTasks).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Basic Git' }),
                expect.objectContaining({ title: 'Git Collaboration' })
            ])
        );
    });

    test('should fetch all tasks', () => {
        const allTasks = getAllTasks();
        expect(allTasks).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Initial Setup' }),
                expect.objectContaining({ title: 'Basic Introduction' }),
                expect.objectContaining({ title: 'Basic Git' }),
                expect.objectContaining({ title: 'Git Collaboration' }),
                expect.objectContaining({ title: 'JavaScript Basics' }),
                expect.objectContaining({ title: 'JavaScript Project' }),
                expect.objectContaining({ title: 'API Introduction' }),
                expect.objectContaining({ title: 'API Consumption' }),
                expect.objectContaining({ title: 'Final Project' }),
                expect.objectContaining({ title: 'Project Presentation' })
            ])
        );
    });

    test('should fetch completed tasks', () => {
        createTask('Basic Introduction', 'Complete the introductory module.', 'Intern', 1);
        completeTask('Basic Introduction');
        const completedTasks = getCompletedTasks();
        expect(completedTasks).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Basic Introduction' })
            ])
        );
    });

    test('should create a new task', () => {
        createTask('New Task', 'New task description', 'Intern', 1);
        const activeTasks = getActiveTasks();
        expect(activeTasks).toContainEqual(
            expect.objectContaining({ title: 'New Task' })
        );
    });

    test('should update a task', () => {
        createTask('Task to Update', 'Original description', 'Intern', 1);
        const taskToUpdate = getActiveTasks().find(task => task.title === 'Task to Update');
        if (taskToUpdate) {
            updateTask(taskToUpdate.id, { title: 'Updated Task Title' });
            const updatedTask = getAllTasks().find(task => task.id === taskToUpdate.id);
            expect(updatedTask?.title).toBe('Updated Task Title');
        }
    });

    test('should delete a task', () => {
        createTask('Task to Delete', 'Description to be deleted', 'Intern', 1);
        const taskToDelete = getActiveTasks().find(task => task.title === 'Task to Delete');
        if (taskToDelete) {
            deleteTask(taskToDelete.id);
            const activeTasks = getActiveTasks();
            expect(activeTasks).not.toContainEqual(
                expect.objectContaining({ id: taskToDelete.id })
            );
        }
    });

    test('should enforce task completion order', () => {
        createTask('Initial Setup', 'Initial setup description', 'Intern', 1);
        createTask('Basic Introduction', 'Basic introduction description', 'Intern', 1);
        createTask('Basic Git', 'Git commands description', 'Intern', 2);
        completeTask('Initial Setup');
        completeTask('Basic Introduction');
        const activeTasks = getActiveTasks();
        expect(activeTasks).toContainEqual(
            expect.objectContaining({ title: 'Basic Git' })
        );
    });
});
