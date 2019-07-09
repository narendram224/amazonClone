const router = require('express').Router();
const algoliaSearch =  require('algoliasearch');
const client  = algoliaSearch('3KCZ990ESV','92ce8854a897d186e87f240f48475ef8');
const index = client.initIndex('amazonClone');

// creting api for search

router.get('/',(req,res,next)=>{
    if (req.query.query) {
        index.search({
            query:req.query.query,
            page:req.query.page
        },(err,content)=>{
           
                res.json({
                    success:true,
                    message:true,
                    status:200,
                    content:content,
                    search_result:req.query.query,

                })
        })
    }
});

module.exports = router;