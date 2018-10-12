const Comment = require("./models/comment"),
Campground = require("./models/campground");

 const data = [
           {
               name: "hamilton",
               image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419__340.jpg",
               description: " simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
           },
           {
               name: "Tana",
               image: "https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412__340.jpg",
               description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock."
           },
           {
               name: "Abay",
               image: "https://cdn.pixabay.com/photo/2016/05/03/05/10/tent-1368516__340.jpg",
               description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. "
           }
           ];

module.exports = ()=>{
    //remove previous data
   Campground.remove({}, function(err){
       if(err){
          console.log(err);
       } 
//       else{
//           console.log("removed!");
//           Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//       });
       
//       }
       
//   });
//           //add hardcoded data to database
//           data.forEach((campground)=>{
//               //enter each camp to database
//               Campground.create(campground, function(err, newCampground){
//                  if(err){
//                      console.log(err);
//                  } 
//                  else{
//                      //add comment for each camp
//                      Comment.create({author: "Homer", text:"I love it here"}, function(err, comment){
//                         if(err){
//                             console.log(err);
//                         } 
//                         else{
//                             newCampground.comments.push(comment);
//                             newCampground.save((err)=>{
//                                 if(err){
//                                     console.log(err);
//                                 }
//                                 else{
//                                  console.log("created");   
//                                 }
//                                 });
//                         }
//                      });
//                  }
//               }); 
    });
};
   