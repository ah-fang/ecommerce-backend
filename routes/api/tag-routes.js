const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: {  
      // be sure to include its associated Product data
      model: Product,
      as: 'products'
    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
      // be sure to include its associated Product data
    include: {
      model: Product,
      as: 'products'

    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

/*
      include: {
        model: ProductTag
      }
*/

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({
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
