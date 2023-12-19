const express = require('express')
const mongoose = require('mongoose')
const User = require('../modal/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

//Burası da okey knk
router.get('/:id', async (req, res) => {
  try {
    let token = req.params.id;
    const decoded = await jwt.verify(token, 'secretKey');

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        title: 'User not found'
      });
    }

    return res.status(200).json({
      title: 'User grabbed',
      user: {
        newsList: user.newsList
      }
    });
  } catch (error) {
    console.error('Hata:', error);
    return res.status(500).json({
      title: 'Internal Server Error'
    });
  }
});

//okeydir sonunda
router.get('/', async (req, res) => {
  try {
    const allNews = await User.find();

    return res.status(200).json({
      title: 'All news grabbed',
      news: allNews
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      title: 'Internal Server Error',
      error: error.message
    });
  }
});







//Burası da okey bebğim
router.get('/:userId/:newId', async (req, res) => {
  let token = req.params.userId;
  let newId = req.params.newId;

  jwt.verify(token, 'secretKey', async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Unauthorized'
      });
    }

    try {
      const user = await User.findOne({ _id: decoded.userId }).exec();

      if (!user) {
        return res.status(404).json({
          title: 'User not found'
        });
      }

      const newsItem = user.newsList.id(newId);

      if (!newsItem) {
        return res.status(404).json({
          title: 'News item not found'
        });
      }

      return res.status(200).json({
        title: 'News item grabbed',
        newsItem: newsItem
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send(error.message || 'Internal Server Error');
    }
  });
});







// burası okey amk
router.post('/:id', async (req, res) => {
  let token = req.params.id;
  jwt.verify(token, 'secretKey', async (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }

    const denemeId = decoded.userId;
    const user = await User.findById(denemeId);

    try {
      if (!user) {
        return res.status(404).send('User not found');
      }

      const newsPosting = {
        title: req.body.title,
        content: req.body.content,
        links: req.body.links,
        category: req.body.category,
        image: req.body.image
      };

      // Ensure that user.newsList is an array before using push
      user.newsList = user.newsList || [];
      user.newsList.push(newsPosting);

      await user.save();

      const lastNews = user.newsList[user.newsList.length - 1];
      res.status(200).send(lastNews);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
});



//Burası da okey bebek
router.put('/:userId/:newId', async (req, res) => {
  const userId = req.params.userId;
  const newId = req.params.newId;
  let token = req.params.userId;

  jwt.verify(token, 'secretKey', async (err, decoded) => {
    const denemeId = decoded.userId;

    try {
      const user = await User.findById(denemeId);

      if (!user) {
        return res.status(404).json({
          title: 'User not found'
        });
      }

      // Kullanıcının newList dizisi var mı kontrol et
      if (!user.newsList || !Array.isArray(user.newsList)) {
        // Eğer newList dizisi yoksa, boş bir dizi olarak oluştur
        user.newList = [];
      }

      const news = user.newsList.id(newId);

      if (!news) {
        return res.status(404).json({
          title: 'News not found'
        });
      }

      // Güncelleme yapılacak alanları req.body üzerinden al
      // Örneğin: title, content, links, category gibi
      news.set(req.body);

      await user.save();

      return res.status(200).json({
        title: 'News updated successfully',
        user: user
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        title: 'Error updating news',
        error: error.message
      });
    }
  });
});



//burası da
router.delete('/:userId/:newId', async (req, res) => {
  let token = req.params.userId;
  const newId = req.params.newId;

  jwt.verify(token, 'secretKey', async (err, decoded) => {
    const denemeId = decoded.userId;

    try {
      const user = await User.findById(denemeId);

      if (!user) {
        return res.status(404).json({
          title: 'User not found'
        });
      }

      // Kullanıcının newsList dizisi var mı kontrol et
      if (!user.newsList || !Array.isArray(user.newsList)) {
        return res.status(400).json({
          title: 'Invalid user newsList structure'
        });
      }

      // newsList dizisinden belirli bir öğeyi sil
      const updatedList = user.newsList.filter(news => news._id.toString() !== newId);

      // Kullanıcıya güncellenmiş listeyi atayın
      user.newsList = updatedList;

      // Kullanıcıyı kaydedin
      await user.save();

      return res.send('Veri başarıyla silindi');
    } catch (error) {
      console.error(error);
      return res.status(500).send(error.message || 'Internal Server Error');
    }
  });
});



module.exports = router