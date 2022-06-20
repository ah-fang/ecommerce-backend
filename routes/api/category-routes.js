const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      as: 'products'
    }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
      // be sure to include its associated Products
    include: [
      {
        model: Product,
        as: 'products',
        // attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
  .then(dbResData => res.json(dbResData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    name: req.body.name
  })
  .then(dbReqData => res.json(dbReqData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    { 
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbUpdatedData => res.json(dbUpdatedData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.delete({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.json({message: 'Successfully deleted'}))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
