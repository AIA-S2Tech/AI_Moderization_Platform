// Repository service (T-12).
// The only way pages / templates get repository data. Returns mock data for now;
// in Phase 3 (T-35) each function body is swapped for an API call, e.g.
//   fetch(`${process.env.REACT_APP_API_BASE_URL}/repositories/${repositoryKey}/items?capability=…`)
// The function names, arguments and returned shapes stay the same, so callers don't change.
//
// Every function is async (returns a Promise), exactly like the real API will be.

import { repositoryMocks } from "../mocks/repositories";

// Small delay so loading states are visible and behave like a real request.
const MOCK_DELAY_MS = 300;

const respond = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY_MS));

// In-memory copy so items added during a session (upload, new folder, certify)
// show up in the lists until the page is reloaded.
const store = Object.fromEntries(
  Object.entries(repositoryMocks).map(([key, items]) => [key, [...items]])
);

const ID_PREFIX = { evidence: "ev", artifacts: "ar", certified: "ce" };

const getList = (repositoryKey) => {
  const list = store[repositoryKey];
  if (!list) throw new Error(`Unknown repository "${repositoryKey}"`);
  return list;
};

// Copies so callers can never change the stored data by accident.
const copy = (item) => ({ ...item });

/**
 * List the items of one repository.
 * @param {"evidence"|"artifacts"|"certified"} repositoryKey
 * @param {{ capability?: string }} [options] – workspace key (config/routes.js
 *        WORKSPACE_ROUTES) to return only that capability's items
 * @returns {Promise<object[]>}
 */
export const getRepositoryItems = async (repositoryKey, { capability } = {}) => {
  const list = getList(repositoryKey);
  const items = capability ? list.filter((item) => item.capability === capability) : list;
  return respond(items.map(copy));
};

/**
 * Item count per repository – for the Repositories hub and dashboard tiles.
 * @returns {Promise<{ evidence: number, artifacts: number, certified: number }>}
 */
export const getRepositoryCounts = async () =>
  respond(Object.fromEntries(Object.entries(store).map(([key, list]) => [key, list.length])));

/**
 * Add an item to a repository (used by Upload Evidence, New Folder and
 * Add Certified Item). The new item goes to the top of the list.
 * @returns {Promise<object>} the stored item, with its new `id`
 */
export const addRepositoryItem = async (repositoryKey, item) => {
  const list = getList(repositoryKey);
  const newItem = { ...item, id: `${ID_PREFIX[repositoryKey] || "item"}-${Date.now()}` };
  store[repositoryKey] = [newItem, ...list];
  return respond(copy(newItem));
};
