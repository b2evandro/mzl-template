import thumbnail from "../../models/thumbnail.js";

export default async function handler(request, response) {
  const { username, bio } = request.query;
  const thumbnailPng = await thumbnail.asPng({
    title: bio,
    owner_username: username,
  });
  response.statusCode = 200;
  response.setHeader("Content-Type", `image/png`);
  response.end(thumbnailPng);
}
