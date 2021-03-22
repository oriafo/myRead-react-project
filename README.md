# myReads Project
 This is a book lending app. where books are categorized into shelf,namely;
 > currentlReading
 > wantToRead
 > read
 The App has the flexibility of moving books from one shelf to the other based on the above 
 listed status, also you can also search for new books to add to you catalog.

To get started, you will need to carry out the following steps

> install all project dependencies with `npm install`
> start the development server with `npm start`

Now the BooksAPI.js is provided for our application to consume some endpoints like;

getAll()
> Returns a Promise which resolves to a JSON object containing a collection of book objects.
> This collection represents the books currently in the bookshelves in your app.

update(book, shelf)
> book: `<Object>` containing at minimum an `id` attribute
> shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
> Returns a Promise which resolves to a JSON object containing the response data of the POST request

search(query)
> query: `<String>`
> Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20   book objects.
> These books do not know which shelf they are on. They are raw results only. You'll need to make   sure that books have the correct state while on the search page.

