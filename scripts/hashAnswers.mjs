import { createHash } from "crypto";

function normalize(s) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}
function sha256(s) {
  return createHash("sha256").update(normalize(s)).digest("hex");
}

const answers = [
  "JSON Web Token",
  "Hashing",
  "Two Factor Authentication",
  "React",
  "SASS",
  "Flexbox",
  "Amazon S3",
  "Serverless",
  "Amazon DynamoDB",
  "Load Balancing",
  "Caching",
  "Auto Scaling",
];

answers.forEach((a, i) => {
  console.log(`Q${i + 1} "${a}": ${sha256(a)}`);
});
