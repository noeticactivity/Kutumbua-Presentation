const slide4 = {
  id: 4,
  title: "Implementation",
  content: `## 💻 The Button Implementation

### A Simple, Powerful Solution:

Each jurisdiction needs to add just a single button to their website after member authentication:

![Code Implementation](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop)

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Lezioni Access Button</title>
  <style>
    a.button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    a.button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <a href="http://kutumbua.net/api/auth/register/get?name=Sammy Smith&email=sammysmith@example.com&password=jbranca@example.com&key={{ $secret }}" class="button">
    Access Lezioni
  </a>
</body>
</html>
\`\`\`

> *"The technical complexity is hidden behind a remarkably simple implementation."*
`
};

export default slide4; 