const Genre=require('../models/GenreModel');

exports.importGenres=async(req,res)=>{
    await Genre.deleteMany({});
    const genres=await Genre.insertMany();
    res.status(201).json(genres)
}
exports.getGenre=async(req,res)=>{
    try {
        const genres=await Genre.find({});
        res.json(genres)
        
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
exports.createGenre=async(req,res)=>
{
    const { title}=req.body
   try {
    const genre=new Genre({title});
    const createdGenre=await genre.save()
    res.status(201).json(createdGenre)
   } catch (error) {
    return res.status(404).json({ message: error.message });
   }
}
exports.updategenre=async(req,res)=>{

    try {
           const { title}=req.body;
           const genre= await Genre.findByIdAndUpdate(req.params.id,{ title},{new:true});
           if(genre){
            res.status(201).json(genre)
          }else{
            res.status(404);
            throw new Error('genre not found')
          }
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
exports.deleteGenre=async(req,res)=>{
    try {
        const genre=await Genre.findByIdAndDelete(req.params.id);
        if(genre){
            res.json({message:" genre deleted successfully"})
        }else{
            res.status(404)
            throw new Error("genre not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}