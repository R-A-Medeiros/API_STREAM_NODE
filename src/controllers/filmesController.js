//import conectar from "../config/dbConnect.js";
import oracledb from "oracledb";


async function conectar() {
    let connection;
  
    try {
      connection = await oracledb.getConnection({
        user: process.env.DB_CONNECTION_USER ,
        password: process.env.DB_CONNECTION_PASSWORD,
        connectString: process.env.DB_CONNECTION_STRING
      });
  
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
  
    } catch (err) {
      console.error(err);
    }
  
    return connection;
  }


  function transformarRetorno(lista) {
    let objeto = lista.map(element => {
        return {     
            "id": element[0],
            "Diretor": element[1],
            "idFilme": element[2],
            "titulo": element[3],
            "ano": element[4],
            "duracao": element[5],
            "url_do_poster": element[6],
            "url_do_trailer": element[7],
            "data_de_lancamento": element[8],
            "nota": element[9],
            "tipo": element[10],
            "sinopse": element[11]
        };
    });

    return objeto;
}

class FilmeController {

    static async listarFilmes(req, res) {
        let connection;
    
        try {
            connection = await conectar();
            const result = await connection.execute(`
                                                    SELECT * 
                                                    FROM MOVIES M 
                                                    INNER JOIN Media MD ON M.MOVIEID = MD.MEDIAID 
                                                    WHERE MD.MEDIATYPE = 'Movie'`);
            const obj = transformarRetorno(result.rows)

            console.log(obj);
            res.status(200).json(obj);
        } catch (erro) {
            res.status(400).json({ message: `${erro.message}` });
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    static async listaFilmesPorTitulo (req, res) {
        let title = req.query.title;
        let connection;
        try {
            connection = await conectar();
            const result = await connection.execute(`SELECT * FROM media WHERE UPPER(title) LIKE UPPER(:title)`, [`%${title}%`]);
            
            if (result.rows.length > 0) {
                res.status(200).send(result.rows);
            } else {
                res.status(404).send("Mídia não encontrada");
            }
            console.log(result.rows);
        } catch (erro){
            console.error(erro);
            res.status(500).send("Erro ao buscar a mídia");
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (erro) {
                    console.error(erro);
                }
            }
        }
    }

 };

export default FilmeController;