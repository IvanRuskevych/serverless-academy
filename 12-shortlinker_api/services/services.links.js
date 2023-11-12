import { customAlphabet } from "nanoid";

import { createHTTPError } from "../utils/createHTTPError.js";
import { client } from "../db.js";

export const generateLinkMarker = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  8
);

export const isExistsLink = async (req, link) => {
  const linkQuery = {
    text: "SELECT * FROM links WHERE original_link = $1",
    values: [link],
  };

  const existsLink = await client.query(linkQuery);

  // if link already exists
  if (existsLink?.rows[0]?.original_link === link) {
    const existsLinkShortUrl = `${req.protocol}://${req.get("host")}/${
      existsLink.rows[0].link_marker
    }`;

    throw createHTTPError(
      409,
      `The link is already exists: ${existsLinkShortUrl}`
    );
  }
};

export const addLink = async (id, link, marker) => {
  const createLinkQuery = {
    text: `INSERT INTO links (id, original_link, link_marker) values ($1, $2, $3)`,
    values: [id, link, marker],
  };

  // if link doesn`t exist => add lint to the db
  await client.query(createLinkQuery);
};

export const getLink = async (marker) => {
  const linkQuery = {
    text: `SELECT original_link FROM links WHERE link_marker=$1 `,
    values: [marker],
  };

  const data = await client.query(linkQuery);

  const link = data.rows[0].original_link;

  if (!link) {
    throw createHTTPError(404, "No link found");
  }

  return link;
};
