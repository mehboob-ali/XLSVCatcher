# XLSVCatcher

A React.js frontend application that allows users to upload Excel and CSV File.

Live Project Link : [https://mehboob-ali-zikrabyte-task.netlify.app/]

## Installation

Clone this repository to your local machine:
1. To clone this repo, run this command in your VS Code terminal:
   #### git clone https://github.com/mehboob-ali/zikrabyte-task
2. Navigate to the project repository:
   #### cd zikrabyte-task
3. Installproject dependencies:
   #### npm install
   
## How to use

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## File Upload: 
To upload a file click on "Choose File" button to choose a file.

Note that this application only allows excel files(.xlsx,.xls) and csv. If you try to upload a different file a pop-up box will show and it will reset the "input file" field.  

![Alt Text](screenshots/Screenshot%202023-10-03%20111746.png)

## Data Preview:
To preview the uploaded data click on 'PREVIEW DATA' button.
A Modal will open which will show the uploaded data in a clean, readable table.
Click on close button to close the modal.  

  

![Alt Text](screenshots/Screenshot%202023-10-03%20111759.png)  

![Alt Text](screenshots/Screenshot%202023-10-03%20111812.png)  

File gets stored in Redux store as JSON:  

![Alt Text](screenshots/Screenshot%202023-10-03%20111851.png)  

## Data Submission:
Cliking on Submit will send the data to the server for processing and the user will receive a confimation message that the file is uploaded succesfully.  
![Alt Text](screenshots/Screenshot%202023-10-03%20111909.png)  

![Alt Text](screenshots/Screenshot%202023-10-03%20111920.png)  




