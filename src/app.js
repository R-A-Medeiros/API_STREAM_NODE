import express from "express";
// import conectaNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";

// const conexao = await conectaNaDataBase();

// conexao.on("error", (erro) => {
//     console.error("erro de conexão", erro);
// })

// conexao.once("open", () => {
//     console.log("Conexao com o banco feita com sucesso");
// } )

const app = express();
routes(app);

// app.use((erro, req, res,next) => {
//     res.status(500).send({message: "Erro interno do servidor"});
// })

// app.get("/movies/:id", (req, res) => {
//     const index = buscaMidia(req.params.id);
//     res.status(200).json(movies[index]);
// });

// app.post("/medias", (req, res) =>{
//     movies.push(req.body);
//     res.status(201).send("mídia cadastrada com sucesso!"); 
// })

// app.put("/movies/:id", (req, res) => {
//     const index = buscaMidia(req.params.id);
//     movies[index].titulo = req.body.titulo;
//     res.status(200).json(movies);
// })

// app.delete("/movies/:id", (req, res) => {
//     const index = buscaMidia(req.params.id);
//     movies.splice(index, 1);
//     res.status(200).send("Filme removido");
// })

// app.get('/movies/:nome', async(req, res) => {
//     const { nome } = req.params;
//     try{
//         const movie = await midia.find({mediaType: 'movie', title: new RegExp(nome, 'i')});
//         if (movie.length > 0) {
//             res.json(movie);
//         } else {
//             res.status(404).json({message: 'filme não encontrado'})
//         }
//     }catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Ocorreu um erro ao buscar o filme' });
//       }   
// });



export default app;