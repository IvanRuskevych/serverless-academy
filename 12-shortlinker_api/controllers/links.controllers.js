import { nanoid } from "nanoid";

import { asyncErrorWrapper } from "../utils/asyncErrorWrapper.js";
import {
  addLink,
  generateLinkMarker,
  getLink,
  isExistsLink,
} from "../services/services.links.js";

const createShortedLink = async (req, res) => {
  const { link: reqLink } = req.body;
  const linkMarker = generateLinkMarker();
  const linkId = nanoid(10);

  await isExistsLink(req, reqLink);

  await addLink(linkId, reqLink, linkMarker);

  const linkShortUrl = `${req.protocol}://${req.get("host")}/${linkMarker}`;

  res.status(200).json({ data: linkShortUrl });
};

const getShortLink = async (req, res) => {
  const { marker } = req.params;

  const link = await getLink(marker);

  res.redirect(link);
};

export const controllerCreateShortedLink = asyncErrorWrapper(createShortedLink);
export const controllerGetShortLink = asyncErrorWrapper(getShortLink);
