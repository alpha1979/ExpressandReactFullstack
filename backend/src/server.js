import express from 'express';
import {db, connectDb} from './db.js';

const app = express();
app.use(express.json());

// app.post("/home", (req, res) => {
//     let name = req.body.name;
//     res.send(`Hello ${name}`);
// });

// app.get('/home/:name', (req, res) => {
//     const name = req.params.name;
//     res.send(`Hello ${name}`);
// })
app.get('/api/articles/:name', async (req, res) => {
    const {name} = req.params;
   
    const article = await db.collection('articles').findOne({name});
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404).send('Article not found');
    }
});

app.put('/api/articles/:name/upvote',async (req, res) => {
    const {name} = req.params;
    
    await db.collection('articles').updateOne({ name }, { 
        $inc: { upvotes: 1 },
    })
    const article = await db.collection('articles').findOne({name});

    if (article) {
        // article.upvotes += 1;
        res.json(article);
    } else {
        res.send('That article doens\'t exists');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const {postedBy, text} = req.body;
    const {name} = req.params;
    
    await db.collection('articles').updateOne({ name }, { 
        $push: { comments: {postedBy, text } },
    });
    const article = await db.collection('articles').findOne({name});
    // const article = articlesInfo.find(a => a.name === name);
    if (article) {
        // article.comments.push({postedBy, text});
        // console.log(article.comments);
        res.json(article);
    } else {
        res.send('That article doens\'t exists');
    }
});

connectDb(() => {
    app.listen(3000, () => {
        console.log("Server is listening ");
    });
})
