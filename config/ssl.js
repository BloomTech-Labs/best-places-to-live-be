let credentials = null;
try {
  const fs = require("fs");
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/stagebe.letsmovehomie.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/stagebe.letsmovehomie.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/stagebe.letsmovehomie.com/chain.pem",
    "utf8"
  );

  credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };
} catch (error) {
  console.log("not using SSL");
  console.log(error);
}
module.exports = credentials;
