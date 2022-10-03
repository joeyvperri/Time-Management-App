This is a time management app that my Senior Design team and I created within React Native utilizing Expo to help students more effectively manage their time.

The login screen is within the App.js file in the main directory, the rest of the screens are within the Screens folder.

On the scheduling screen, the user may select a date, and then enter where they plan to spend their time throughout that day in our 5 categories. 

The five categories include:
Homework
Sleeping
Studying
Commuting
Freetime

As the user enters data, a pie chart displays the percentage of time that the user is putting into each category.

Once the user submits their schedule for that date, the date along with the hours they input are inserted into a table within our SQLite database, 
where it may be retrieved later.

On the results screen, the user may then select a data and enter the hours that they actually completed for that day. They are then given a score. The
user may then share those results if they choose to through social media or text. Once the user submits, the hours are used to update the already existing rows within the table.

The support screen allows the user to reach out for campus resources, including mental health and academic assistance.

The history screen is utilized to view data and visuals for completed days in the past. The user may view data by month, day or year.
Once the user selects the date/month/year, they are met with line graphs comparing their planned hours alongside the hours that they actually completed.
There are also tables that display the data along with a progress bar that displays a percentage of their overall progress.

There is also a ToDo List screen where the user can enter tasks that they plan to complete. 
Once the user submits a task, it is submitted to our SQLite database and displayed in the list.

If the user taps on the task, it is moved to completed, and if they tap it again, it disappears.
There are also different categories for the tasks, such as Chores, Errands, Urgent tasks, etc. These categories determine the color of the task within the list.

 
