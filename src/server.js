const app = require("./app");
const sequelize = require("./config/db");

require("./models");

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
  });

sequelize.sync({ alter: true }).then(() => console.log("✅ Tables synced"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});