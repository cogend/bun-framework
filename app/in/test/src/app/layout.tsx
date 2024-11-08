export default ({ children }) => (
  <html>
    <head>
      <title>Cogend</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <main id="root">{children}</main>
    </body>
  </html>
);
