const server = require("./app");

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
