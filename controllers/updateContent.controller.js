const db = require("./../models");
const { uuidv, uuid } = require("uuidv4");


const getContentByUser= async (req,res)=>
{
  const userId= req.userId;
  console.log(userId)
  
  try{ 
    let response= await db.updateContent.find({userId:userId})
    //.populate("updateContent");
    if (!response) {
      return res.status(404).send({
        statusCode: 404,
        message: `Cannot find user with ${userId}`,
      });
    }
    res.status(200).send({
      statusCode:200,
      message:response
    })
  }
  catch (error){
    console.log(error)
      res.status(500).send({
        statusCode:500,
      
        message:error||"Internal server error"
      })
  }
}
const searchContent = async (req, res) => {
  const title = req.params.title;
  if (title == "" || title == "undefined") {
    const result = await db.updateContent.find();
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  }
  try {
    const result = await db.updateContent.find({
      title: { $regex: title, $options: "i" },
    });
    return res.status(200).send({
      message: "Success",
      response: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error occured",
    });
  }
};


const getContentById = async(req,res)=>
{
  const id = req.params.id
  
  try {
      const response = await db.updateContent.findById(id)
      res.status(200).send({
        statusCode:200,
        response:[response]
      })
  }
  catch(error)
  {
       res.status(500).send({
         statusCode:500,
      
         error:error||"Internal Server Error"
       })
  }
}

const getContent = async (req, res) => {
  let filterObj = {};
  const {
    region,
    kindofplaces,
    typeofplaces,
    activities,
    prices,
    liked,
    title,
  } = req.query;
  if (liked != "blue") {
    filterObj.liked == "red";
  }
  if (region !== undefined) {
    filterObj.region = region;
  }
  if (kindofplaces != undefined) {
    filterObj.kindofplaces = kindofplaces;
  }
  if (typeofplaces != undefined) {
    filterObj.typeofplaces = typeofplaces;
  }
  if (activities != undefined) {
    filterObj.activities = activities;
  }
  if (prices != undefined) {
    filterObj.prices = prices;
  }

  let limit = 2;
  const { page } = req.query;
  let nextPage = null;
  let prevPage = null;
  let pages;

  if (req.query.limit <= 0 || page <= 0) {
    res.status(400).send({
      message:
        "Bad request, the value of limit and page must be greater than 0",
    });
  }
  if (Boolean(limit)) {
    limit = req.query.limit;
  }
  try {
    const total = await db.updateContent.find().count();
    if (total % limit == 0) {
      pages = total / limit;
    } else {
      pages = parseInt(total / limit) + 1;
    }
    if (page) {
      const response = await db.updateContent
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (page != 1) {
        prevPage = `http://localhost:3000/place/contents?page=${
          page - 1
        }&limit=${limit}`;
      }
      if (page < pages) {
        nextPage = `http://localhost:3000/place/contents?page=${
          page + 1
        }&limit=${limit}`;
      }
      res.status(200).send({
        response: response,
        pages: pages,
        count: response.length,
        total: total,
        firstPage: `http://localhost:3000/place/contents?page=1&limit=${limit}`,
        prevPage: prevPage,
        nextPage: nextPage,
        currentPage: `http://localhost:3000/place/contents?page=${page}&limit=${limit}`,
        lastPage: `http://localhost:3000/place/contents?page=${pages}&limit=${limit}`,
      });
    }

    //if(title!=undefined)
    //{
    //  const response = await db.updateContent.find({title:{$regex:title,$options:"i"}})
    //  res.status(200).send({
    //    total: total,
    //    count: response.length,
    //    data: response,
    //  });
    //}
    else if (Object.keys(filterObj).length !== 0 && title != undefined) {
      //const response = await db.updateContent.find({$and:[{title},{filterObj}]})
      const response = await db.updateContent.find(filterObj);
      const result = response.filter((item) =>
        item.title
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(title.toLowerCase().replaceAll(" ", ""))
      );

      res.status(200).send({
        total: total,
        count: result.length,
        response: result,
      });
    } else if (title !== undefined) {
      const response = await db.updateContent.find({
        title: { $regex: title, $options: "i" },
      });

      res.status(200).send({
        total: total,
        count: response.length,
       response : response,
      });
    } else if (Object.keys(filterObj).length !== 0) {
      console.log(filterObj);
      //convert object keys and its value to the array
      var arr = [];
      for (var prop in filterObj) {
        if (filterObj.hasOwnProperty(prop)) {
          var innerObj = {};
          innerObj[prop] = filterObj[prop];
          arr.push(innerObj);
        }
      }
      console.log(arr);
      const response = await db.updateContent.find(filterObj);
      res.status(200).send({
        total: total,
        count: response.length,
        response: response,
      });
    } else {
      const response = await db.updateContent.find();
      res.status(200).send({
        total: total,
        count: response.length,
        response,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || "Error occured",
      statusCode: 500,
    });
  }
};

const createContent = async (req, res) => {
  const userId= req.userId
  const body = req.body;
  if (Object.keys(body).length == 0) {
    return res.status(400).send({
      message: "Can't find data to create",
    });
  }
  const create = new db.updateContent({
    title: body.title,
    desc: body.desc,
    note: body.note,
    email: body.email,
    phoneNumber: body.phoneNumber,
    address: body.address,
    proximity: body.proximity,
    latlong: body.latlong,
    url: body.url,
    region: body.region,
    kindofplaces: body.kindofplaces,
    typeofplaces: body.typeofplaces,
    activities: body.activities,
    prices: body.prices,
    liked: body.liked,
    userId
  });
  try {
    const response = await create.save();
    res.status(200).send({
      message: "Created successfully",
      reponse: response,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: error || "Error occurred",
    });
  }
};
const updateContent = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const response = await db.updateContent.findByIdAndUpdate(id, body);
    res.status(200).send({
      message: `Updated successfully with this id ${id}`,
      statusCode: 200,
      response,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: error || "Error occurred",
    });
  }
};
const deleteContent = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      message: "Can't delete without id value",
      statusCode: 400,
    });
  }

  try {
    const response = await db.updateContent.findByIdAndDelete(id);
    res.status(200).send({
      message: `Deleted successfully with this id ${id}`,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: error || "Error occurred",
    });
  }
};
const approve = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.updateContent.findByIdAndUpdate(id, {
      approve: true,
    });
    if (!response) {
      return res.status(404).send({
        message: "Error, data is not existed yet",
        statusCode: 404,
      });
    }
    res.status(200).send({
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
    });
  }
};
//const getApprove= async(req,res)=>
//{
//  try{
//
//    const response = db.updateContent.find({approve:false})
//
//  }
//  catch{
//
//  }
//}
/*
const getApprove= async(req,res)=>
{
  try{
     
    const response = db.updateContent.find({approve:true})

  }
  catch{

  }
}
*/
const addComment = async (req, res) => {
  const text = req.body.text;
  const contentId = req.params.contentId;
  //check who comment by that user's id
  const userId = req.userId;

  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ message: "body is empty", statusCode: 400 });
    }
    if (!userId) {
      return res
        .status(401)
        .send({ message: "No current user", statusCode: 401 });
    }
    //find if that content with that content id is exist
    const post = await db.updateContent.findById(contentId);
    if (!post) {
      return res.status(404).send({ message: "No content exist in our api" });
    }
    const newComment = {
      _id: uuid(),
      userId,
      text,
    };
    console.log(post);
    await post.comments.unshift(newComment);
    await post.save();
    res.status(200).send({ mesage: "Success", comments: newComment });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: error || "Internal server error",
    });
  }
};
const deleteComment = async (req, res) => {
  const { contentId, commentId } = req.params;
  const userId = req.userId;
  try {
    //find content
    const post = await db.updateContent.findById(contentId);
    if (!post) {
      return res.status(404).send({ message: "No content exist in our api" });
    }
    //find comment
    const comment = post.comments.find((cmt) => cmt._id == commentId);
    if (!comment) {
      return res.status(404).send({ message: "No comment found" });
    }
    //owner's comment
    if (comment.userId != userId) {
      return res
        .status(400)
        .send({
          message: "You're not the owner of this comment",
          statusCode: 400,
        });
    }

    const indexOf = post.comments.map(((cmt) => cmt._id).indexOf(commentId));
    console.log(indexOf);
    //remove comment
    post.comments.splice(indexOf, 1);
    await post.save();
    res.status(200).send({ message: "Success", statusCode: 200 });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: error || "Internal server error",
    });
  }
};
{
  /*
                                      SAVE CONTENTS
*/
}

const savedContents = async (req, res) => {
  const userId = req.userId;
  const contentId = req.params.contentId;
 
  
  try {
    //check if that user is exist in our database
    let user = await db.users.findById({ _id:userId });
  console.log(user)
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: `Cannot save favorite content with this user ID:${userId}`,
      });
    }
   
    const isExist = user.savedContent.find(
      (content) => content.toString() === contentId
    );
    if (isExist) {
      return res
        .status(400)
        .send({
          statusCode: 400,
          message:
            "The content that you try to add is already exist in your saved content page!",
        });
    }
    user = await db.users.findByIdAndUpdate(
      userId,
      {
        $push: { savedContent: contentId },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .send({ statusCode: 200, message: "Saved content sucessfully!" });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ statusCode: 500, message: error||"Internal Server Error." });
  }
};
const removeSavedContents = async (req, res) => {
  const userId = req.userId;
  const contentId = req.params.contentId;
  let user;
  try {
    //check if that user is exist in our database
    user = await db.users.findById({ _id:userId });
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: `Cannot remove favorite content with this user ID:${userId}`,
      });
    }
    const isExist = user.savedContent.find(
      (content) => content.toString() === contentId
    );
    if (!isExist) {
      return res.status(400).send({
        statusCode: 400,
        message: "Content is not exist in the saved collection!",
      });
    }
    user = await db.users.findByIdAndUpdate(
      userId,
      {
        $pull: { savedContent: contentId },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .send({ statusCode: 200, message: "Remove saved content successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Internal Server Error." });
  }
};
const findSavedContent = async (req, res) => {
  const userId = req.userId;
  console.log(userId)
  try {
    //const user = await db.users.findById({_id:userId})
    let user = await db.users.findById({ _id:userId }).populate('savedContent')
    //.populate("updateContent");
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: `Cannot find user with ${userId}`,
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "success",
      savedContents: user.savedContent,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};


module.exports = {
  getContent,
  getContentByUser,
  createContent,
  updateContent,
  deleteContent,
  searchContent,
  deleteComment,
  addComment,
  approve,
  savedContents,
  removeSavedContents,
  findSavedContent,
  getContentById
};
