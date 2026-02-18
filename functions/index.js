const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Busboy = require("busboy");

const mailtrapApiKey = defineSecret("MAILTRAP_API_KEY");

const SENDER_EMAIL = "hello@nouvo.dev";
const SENDER_NAME = "Blast & Beyond LLC";

const RECIPIENTS = {
  detailing: ["aiden.deshommes@gmail.com"],
  "detailing-review": ["aiden.deshommes@gmail.com"],
  carwashing: ["aiden.deshommes@gmail.com", "inisamade@gmail.com"],
  test: ["manueldavid500@gmail.com"],
};

const CATEGORIES = {
  detailing: "Detailing Quote",
  "detailing-review": "Detailing Review",
  carwashing: "Car Wash Quote",
  test: "Test",
};

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const files = [];
    const bb = Busboy({ headers: req.headers });

    bb.on("field", (name, val) => { fields[name] = val; });
    bb.on("file", (name, file, info) => {
      const chunks = [];
      file.on("data", (d) => chunks.push(d));
      file.on("end", () => {
        const buf = Buffer.concat(chunks);
        if (buf.length > 0) {
          files.push({
            filename: info.filename,
            content: buf.toString("base64"),
            type: info.mimeType || "application/octet-stream",
          });
        }
      });
    });
    bb.on("finish", () => resolve({ fields, files }));
    bb.on("error", reject);

    if (req.rawBody) {
      bb.end(req.rawBody);
    } else {
      req.pipe(bb);
    }
  });
}

exports.contact = onRequest(
  { region: "us-central1", cors: true, secrets: [mailtrapApiKey] },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { fields, files } = await parseMultipart(req);

      const source = fields._source || "detailing";
      const subject = fields._subject || "New Form Submission — Blast & Beyond";
      const recipients = RECIPIENTS[source] || RECIPIENTS.detailing;
      const category = CATEGORIES[source] || "Blast Beyond";
      const customerEmail = fields.email || "";

      const html = buildEmailHtml(fields, source);
      const text = buildEmailText(fields);

      const payload = {
        from: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: recipients.map((email) => ({ email })),
        subject,
        category,
        html,
        text,
        headers: { "X-Form-Source": source },
      };

      if (customerEmail) {
        payload.headers["Reply-To"] = customerEmail;
      }

      if (files.length > 0) {
        payload.attachments = files.map((f) => ({
          filename: f.filename,
          content: f.content,
          type: f.type,
          disposition: "attachment",
        }));
      }

      const response = await fetch("https://send.api.mailtrap.io/api/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mailtrapApiKey.value()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Mailtrap error:", response.status, errorBody);
        res.status(500).json({ error: "Failed to send email" });
        return;
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Contact API error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

function buildEmailHtml(fields, source) {
  const isReview = source === "detailing-review";
  const isCarwash = source === "carwashing";
  const services = Object.entries(fields)
    .filter(([k, v]) => k.startsWith("service-") && v)
    .map(([, v]) => v);

  const goldColor = "#c9a84c";
  const bgColor = "#0a0a0a";
  const cardBg = "#111111";

  if (isReview) {
    const stars = "★".repeat(Number(fields.rating) || 0) + "☆".repeat(5 - (Number(fields.rating) || 0));
    return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:${bgColor};color:#fff;padding:32px;border-radius:12px;">
      <div style="text-align:center;margin-bottom:24px;"><h1 style="color:${goldColor};font-size:24px;margin:0;">New Customer Review</h1><p style="color:#666;font-size:14px;">Blast & Beyond — Detailing</p></div>
      <div style="background:${cardBg};border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:24px;">
        <p style="color:${goldColor};font-size:28px;letter-spacing:4px;text-align:center;margin:0 0 16px;">${stars}</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;font-size:13px;">Name</td><td style="padding:8px 0;color:#fff;">${fields.reviewer_name || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px;">Service</td><td style="padding:8px 0;color:#fff;">${fields.service_received || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px;">Review</td><td style="padding:8px 0;color:#fff;">${fields.review_text || "—"}</td></tr>
        </table>
      </div></div>`;
  }

  const title = isCarwash ? "New Car Wash Quote Request" : "New Detailing Quote Request";
  const subtitle = isCarwash ? "Blast & Beyond — Pressure Washing & Yard Services" : "Blast & Beyond — Auto Detailing";

  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:${bgColor};color:#fff;padding:32px;border-radius:12px;">
    <div style="text-align:center;margin-bottom:24px;"><h1 style="color:${goldColor};font-size:24px;margin:0;">${title}</h1><p style="color:#666;font-size:14px;">${subtitle}</p></div>
    <div style="background:${cardBg};border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;width:120px;">Name</td><td style="padding:10px 0;color:#fff;">${fields.name || "—"}</td></tr>
        <tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Email</td><td style="padding:10px 0;color:#fff;">${fields.email || "—"}</td></tr>
        <tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Phone</td><td style="padding:10px 0;color:#fff;">${fields.phone || "—"}</td></tr>
        ${fields.city_zip ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">City / ZIP</td><td style="padding:10px 0;color:#fff;">${fields.city_zip}</td></tr>` : ""}
        ${fields.address ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Address</td><td style="padding:10px 0;color:#fff;">${fields.address}</td></tr>` : ""}
        ${fields.vehicle_model ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Vehicle</td><td style="padding:10px 0;color:#fff;">${fields.vehicle_model}</td></tr>` : ""}
        ${fields.preferred_date ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Preferred Date</td><td style="padding:10px 0;color:#fff;">${fields.preferred_date}</td></tr>` : ""}
        ${services.length > 0 ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Services</td><td style="padding:10px 0;color:${goldColor};">${services.join(", ")}</td></tr>` : ""}
        ${fields.message ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Notes</td><td style="padding:10px 0;color:#fff;">${fields.message}</td></tr>` : ""}
      </table>
    </div>
    <p style="text-align:center;color:#444;font-size:12px;margin-top:24px;">Sent from blastnbeyond.com</p></div>`;
}

function buildEmailText(fields) {
  const lines = ["New Form Submission — Blast & Beyond", ""];
  for (const [key, value] of Object.entries(fields)) {
    if (key.startsWith("_")) continue;
    lines.push(`${key}: ${value}`);
  }
  return lines.join("\n");
}
