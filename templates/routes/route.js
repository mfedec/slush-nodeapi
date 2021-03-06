var <%= modelNameUCase %> = require('../models/<%= modelName%>');

module.exports = function(router) {

	router.route('/<%= modelPluralLCase %>')
        .get(function(req, res) {
            <%= modelNameUCase %>.find({deleted: false}, function(err, <%= modelPluralLCase %>) {
                if (err)
                    return res.status(500).send(err);
                    
                res.status(200).json(<%= modelPluralLCase %>);
            });
        })
        
        .post(function(req, res) {
            var new<%= modelNameUCase %> = new <%= modelNameUCase%>();
           
           	// Add Fields here
           	new<%= modelNameUCase %>.name = req.body.name
           	// new<%= modelNameUCase %>. = req.body.
            
            <%= modelNameUCase%>.findOne({name: new<%= modelNameUCase%>.name}, function(err, <%= modelNameLCase %>){
                if (err)
                    return res.status(500).send(err);
                
                if (<%= modelNameLCase %>) {
                    res.status(409).json({message: '<%= modelNameUCase%> Already Exists'});
                } else {
                    new<%= modelNameUCase%>.save(function(err) {
                        if (err)
                            return res.status(500).send(err);

                        var clean<%= modelNameUCase%> = new<%= modelNameUCase%>.toObject();
                        delete clean<%= modelNameUCase%>['deleted'];

                        res.status(200).json(clean<%= modelNameUCase%>);
                    });
                }
            });
        })
    ;
    
    router.route('/<%= modelPluralLCase %>/:id')
        .get(function(req, res) {
            <%= modelNameUCase %>.findById(req.params.id)
                .exec(function(err, <%= modelNameLCase %>) {
                    if (err)
                        return res.status(500).send(err);
                        
                    res.status(200).json(<%= modelNameLCase %>);
                });
        })
        
        .put(function(req, res) {
            <%= modelNameUCase %>.findById(req.params.id, function(err, <%= modelNameLCase %>) {
                if (err)
                    return res.status(500).send(err);
                    
                /* Add your field updates here */
                <%= modelNameLCase %>.name = req.body.name;
                <%= modelNameLCase %>.active = req.body.active;
                    
                <%= modelNameLCase %>.save(function(err) {
                    if(err)
                        return res.status(500).send(err);
                        
                    res.status(200).json(<%= modelNameLCase %>);
                });
            });
        })
        
        .delete(function(req, res) {
            <%= modelNameUCase %>.findById(req.params.id, function(err, <%= modelNameLCase %>) {
                <%= modelNameLCase %>.deleted = true;
                <%= modelNameLCase %>.save(function(err) {
                    if (err)
                        return res.status(500).send(err);

                    res.status(200).json({message: "<%= modelNameUCase %> Deleted"});
                })
            });
        })
    ;
       
}