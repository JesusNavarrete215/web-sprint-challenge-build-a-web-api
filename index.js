const PORT = process.env.PORT || 5000;

const server = require("./api/server");

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
