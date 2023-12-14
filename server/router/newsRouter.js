const express = require('express')
const mongoose = require('mongoose')
const User = require('../modal/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

router.get('/:id', async (req, res) => {
  let token = req.params.id
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if(err) return res.status(401).json({
      title: 'unautherized'
    })
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      return res.status(200).json({
        title: 'user grabbed',
        user: {
          newList: user.newList
        }
      })
    })
  })
})

router.get('/:userId/:newId/done', async (req, res) => {
  let token = req.params.id
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if(err) return res.status(401).json({
      title: 'unautherized'
    })
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      return res.status(200).json({
        title: 'user grabbed',
        user: {
          newList: user.newList
        }
      })
    })
  })
})

router.post('/:id', async (req, res) => {
  let token = req.params.id
  jwt.verify(token, 'secretKey', async (err, decoded) => {
    const denemeId = decoded.userId
    const user = await User.findById(denemeId)
    try {
      const newPosting = await user.newList.push({
        description: req.body.description
      });
      await user.save()
      res.sendStatus(200).send(newPosting)
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  })
})

router.put('/:userId/:newId', async (req, res) => {
  const userId = req.params.userId
  const newId = req.params.newId
  let token = req.params.userId
  jwt.verify(token, 'secretKey', async (err, decoded) => {
    const denemeId = decoded.userId
    await User.findById(denemeId)
      .then((user) => {
        const news = user.newList.id(newId)
        news.set(req.body)
        return user.save()
      })
      .then((user) => {
        res.send({ user })
      })
      .catch(error => res.status(400).send(error))
  })
})

router.delete('/:userId/:newId', async (req, res) => {
  let token = req.params.userId
  const newId = req.params.newId;
  const userId = req.params.userId;

  jwt.verify(token, 'secretKey', async (err, decoded) => {
    const denemeId = decoded.userId
    User.findById(denemeId, (err, user) => {
      if (err) {
        return res.send(err);
      }  
      const newIndex = user.newList.indexOf(newId);
      user.newList.splice(newIndex, 1);
      user.save((err) => {
        if (err) {
          return res.send(err);
        }
  
        return res.send('Veri başarıyla silindi');
      });
    })
  })
})

module.exports = router