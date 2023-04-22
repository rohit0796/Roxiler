const express = require('express');
const request = require('request');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = require('./model/Schema');
const axios = require("axios")
const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

//save in database

router.get('/save', (req, res) => {
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log(error);
        } else {
            body.map((ele) => {
                const userSchema = new Schema({
                    id: ele.id,
                    title: ele.title,
                    price: ele.price,
                    desc: ele.description,
                    category: ele.category,
                    image: ele.image,
                    sold: ele.sold,
                    dateOfSale: ele.dateOfSale
                });

                userSchema.save()
                    .then( console.log('saved in db'))
                    .catch(err => console.log(err));
            });
        }
    });
});

// sales sold and not sold of a month

router.get('/sales/:month', async (req, res) => {
    const month = parseInt(req.params.month);

    const pipeline1 = [
        {
            $match: {
                sold: true,
                $expr: {
                    $eq: [
                        {
                            $month: '$dateOfSale'
                        },
                        month
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                totalSaleAmount: { $sum: '$price' },
                totalSoldItems: { $sum: 1 },
            }
        }
    ];
    const pipeline2 = [
        {
            $match: {
                sold: false,
                $expr: {
                    $eq: [
                        {
                            $month: '$dateOfSale'
                        },
                        month
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                totalNotSoldItems: { $sum: 1 },
            }
        }
    ];

    try{

        const sales = await Schema.aggregate(pipeline1);
        const notsales = await Schema.aggregate(pipeline2);
        const result = {
            totalSaleAmount: sales[0]?.totalSaleAmount || 0,
            totalSoldItems: sales[0]?.totalSoldItems || 0,
            totalNotSoldItems: notsales[0]?.totalNotSoldItems || 0,
        }
        res.status(200).json(result);
    }
    catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});


// bar chart 

router.get('/bar-chart/:month', async (req, res) => {
    const month = parseInt(req.params.month);  
    const pipeline = [
      
      {
        $match: {
            $expr: {
                $eq: [
                    {
                        $month: '$dateOfSale'
                    },
                    month
                ]
            }
        }
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: [ "$price", 100 ] }, then: "0-100" },
                { case: { $lte: [ "$price", 200 ] }, then: "101-200" },
                { case: { $lte: [ "$price", 300 ] }, then: "201-300" },
                { case: { $lte: [ "$price", 400 ] }, then: "301-400" },
                { case: { $lte: [ "$price", 500 ] }, then: "401-500" },
                { case: { $lte: [ "$price", 600 ] }, then: "501-600" },
                { case: { $lte: [ "$price", 700 ] }, then: "601-700" },
                { case: { $lte: [ "$price", 800 ] }, then: "701-800" },
                { case: { $lte: [ "$price", 900 ] }, then: "801-900" },
                { case: { $gt: [ "$price", 900 ] }, then: "901-above" }
              ]
            }
          },
          count: { $sum: 1 }
        }
      }
    ];
  
    try {
      const rest = await Schema.aggregate(pipeline);
    const result = rest.map((dat)=>{
        return{
            range:dat._id,
            count:dat.count
        }
    })
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

  // Pie Chart

  router.get('/pie-chart/:month', async (req, res) => {
    const month = parseInt(req.params.month);  
    const pipeline = [
      
      {
        $match: {
            $expr: {
                $eq: [
                    {
                        $month: '$dateOfSale'
                    },
                    month
                ]
            }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ];
  
    try {
      const salesData  = await Schema.aggregate(pipeline);
      const result = salesData.map((data) => {
        return {
          category: data._id,
          count: data.count
        }
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


//combined data

router.get('/combined-data/:month', async (req, res) => {
    const month = parseInt(req.params.month);  
    try {  
      const salesByPriceRange = await axios.get(`http://localhost:5001/bar-chart/${month}`);
      const salesByCategory = await axios.get(`http://localhost:5001/pie-chart/${month}`);
      const totalSales = await axios.get(`http://localhost:5001/sales/${month}`);
  
      const combinedData = {
        salesByPriceRange: salesByPriceRange.data,
        salesByCategory: salesByCategory.data,
        totalSales: totalSales.data,
      };
  
      res.json(combinedData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });
module.exports = router;
