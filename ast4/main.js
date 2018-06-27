
function loopy() {
    /* 
     Edit this function such that it returns {id, title, boxart} for every video in the movieLists. 
     Only boxart with dimensions of 150x200px should be selected.
     
    Solve this problem with map(), reduce(), and filter(). 
    */

    var movieLists = [{
        name: "Instant Queue",
        videos: [{
            "id": 70111470,
            "title": "Die Hard",
            "boxarts": [{
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
            },
            {
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg"
            }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
        },
        {
            "id": 654356453,
            "title": "Bad Boys",
            "boxarts": [{
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg"
            },
            {
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg"
            }

            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{
                id: 432534,
                time: 65876586
            }]
        }
        ]
    },
    {
        name: "New Releases",
        videos: [{
            "id": 65432445,
            "title": "The Chamber",
            "boxarts": [{
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg"
            },
            {
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg"
            }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
        },
        {
            "id": 675465,
            "title": "Fracture",
            "boxarts": [{
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg"
            },
            {
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg"
            },
            {
                width: 300,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg"
            }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{
                id: 432534,
                time: 65876586
            }]
        }
        ]
    }
    ];


    //create new array
    var newMovieLists=[];

    //filter the json (object) in valid format
    function filterByDimention(item){
        return item.width===150&&item.height===200;
    }

    function filterByBoxArts(item){
        console.log(item.boxarts);
        var boxArt=item.boxarts;
        return validsize=boxArt.filter(filterByDimention);
    }

    function filterMovie(item){
       var videos=item.videos;
        return validMovie=videos.filter(filterByBoxArts);
    }

    //calling filter method
    // var arrByBoxArts=movieLists.filter(filterMovie);

    //map to new array 
    // return new array

    // return newMovieLists=movieLists.map(function(obj){
    //    obj.filter(filterMovie);
    // });
     newMovieLists = movieLists.filter(filterMovie);
     console.log(newMovieLists);
   

}

loopy();
