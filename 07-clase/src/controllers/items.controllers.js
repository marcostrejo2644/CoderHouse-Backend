import fs from 'fs/promises';
import path from 'path';

import random from '../helpers/random.helper';

const itemsFile = path.join(__dirname, '..', 'files', 'product.txt');
const visitsItemsFile = path.join(__dirname, '..', 'files', 'visits-items.txt');
const visitsRandomFile = path.join(
  __dirname,
  '..',
  'files',
  'visits-randoms.txt'
);

const itemsController = {};

itemsController.getItems = async (req, res) => {
  try {
    const items = JSON.parse(await fs.readFile(itemsFile));

    const visitItem = JSON.parse(await fs.readFile(visitsItemsFile));
    await fs.writeFile(visitsItemsFile, JSON.stringify(visitItem + 1, null, 2));

    res.json(items);
  } catch (error) {
    console.log(error);
  }
};

itemsController.randomItem = async (req, res) => {
  try {
    const items = JSON.parse(await fs.readFile(itemsFile));
    const randomId = Math.floor(random(items.length - 1));
    const item = items[randomId];

    // Add visit Random
    const visitRandom = JSON.parse(await fs.readFile(visitsRandomFile));
    await fs.writeFile(
      visitsRandomFile,
      JSON.stringify(visitRandom + 1, null, 2)
    );

    res.json(item);
  } catch (error) {
    console.log(error);
  }
};

itemsController.getVisits = async (req, res) => {
  try {
    const itemsTotal = JSON.parse(await fs.readFile(visitsItemsFile));
    const randomsItems = JSON.parse(await fs.readFile(visitsRandomFile));
    res.json({
      visitas: {
        itemsTotal,
        randomsItems,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default itemsController;
