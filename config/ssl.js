const credentials = null;
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
} catch {
  console.log("not using SSL");
}
module.exports = credentials;
