# Survey Application

This is a simple survey application built with React, TypeScript and a Supabase API designed to manage survey submissions. 
Users can submit new survey notes, as well as view and edit previous submissions. 

## Installation 
1. Clone the repository 
```js
git clone https://github.com/your-username/survey-app.git
cd survey-app
```
2. Install dependencies: Run the following command to install all necessary dependencies: 
```js
npm install
```
3. Set up environment variables: Create a .env file in the root of the project and add the following:
```js
VITE_API_KEY=your_supabase_api_key
```
4. Run the development server: Start the application by running:
```js
npm run dev
```

The application should now be running on http://localhost:3000. Open this URL in your browser.


## Future Improvements 
If I had more time on the project I would make the following adjustments: 
-> Organise my code into better, reusable components. I had all intentions of doing this when I began the project, but 
due to getting stuck and just wanting to meet the mvp within as close to the time frame as possible, I didn't make 
the changes. 
-> Present the previous submissions in a more user-friendly way. Currently, it's not super clear to read and could be 
organised better. Pagination would be something I'd look into to manage large quantities of submissions. 
-> The user would want their submissions to be secure and I imagine prviate, so looking into how to make the application 
secure.
-> Feature - Ability to delete submissions 
-> Writing tests 
