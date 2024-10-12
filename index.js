import express from "express";
const app = express();
const port = 4000;

// To store blog posts temporarily
let posts = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Home route to show posts
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

//Route to create a new post
app.post("/new-blog", (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: posts.length + 1, title, content });
  res.render("index.ejs", { posts });
});

// app.post("/new-blog", ... ): This sets up the route to handle form submissions via POST requests to the /new-blog URL. This is triggered when a user submits a new blog post.
// const { title, content } = req.body;: This line extracts the title and content from the form data sent by the user when submitting a new post.
// posts.push({ id: posts.length + 1, title, content });: This creates a new post object with an id (calculated based on the length of the posts array), along with the title and content, and then pushes it into the posts array.
// res.render("index.ejs", { posts });: After adding the new post, it re-renders the index.ejs template, passing the updated posts array to display all the blog posts on the homepage.

app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  res.render("post.ejs", { post });
});

// app.get("/edit/:id", ... ): This sets up a GET route that listens for requests to /edit/:id, where :id is a placeholder for the actual post ID. This route displays a form to edit an existing post.
// const post = posts.find((p) => p.id == req.params.id);: This line searches for the post in the posts array where the id matches the id parameter from the URL (req.params.id).
// res.render("post.ejs", { post });: It renders the post.ejs view, passing the post object to it. This view will display a form pre-filled with the current title and content of the post for editing.

app.post("/edit/:id", (req, res) => {
  const { title, content } = req.body;
  const post = posts.find((p) => p.id == req.params.id);
  post.title = title;
  post.content = content;
  res.render("index.ejs", { posts });
});

// app.post("/edit/:id", ... ): This sets up a POST route that listens for form submissions to /edit/:id, where :id is the post ID. This route is triggered when a user submits the form to save the edited post.
// const { title, content } = req.body;: This extracts the new title and content from the form submitted by the user.
// const post = posts.find((p) => p.id == req.params.id);: This finds the post in the posts array where the id matches the ID in the URL parameter (req.params.id).
// post.title = title;: This updates the title of the found post with the new value from the form.
// post.content = content;: This updates the content of the found post with the new value from the form.
// res.render("index.ejs", { posts });: After updating the post, it re-renders the index.ejs template, passing the updated posts array so that the modified post is displayed with the changes.

app.get("/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id != req.params.id);
  res.render("index.ejs", { posts });
});

// app.get("/delete/:id", ... ): This sets up a GET route to handle requests to /delete/:id, where :id is the post ID. This route is triggered when the user clicks a "Delete" button.
// posts = posts.filter((p) => p.id != req.params.id);: This filters the posts array, removing the post that matches the id in the URL (req.params.id). The filter function keeps only the posts whose ID does not match the given ID.
// res.render("index.ejs", { posts });: After deleting the post, it re-renders the index.ejs template, passing the updated posts array so that the deleted post is no longer displayed.

app.listen(port, (req, res) => {
  console.log(`Server running on ${port}`);
});
