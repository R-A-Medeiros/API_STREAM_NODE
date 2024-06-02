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


  class SerieController {

    static async listarSeries (req, res) {
        let connection;
        try {
            connection = await conectar();
            const result = await connection.execute(`
                                                    SELECT * 
                                                    FROM SERIES S 
                                                    INNER JOIN Media MD ON S.SERIESID = MD.MEDIAID 
                                                    WHERE MD.MEDIATYPE = 'Series'`);

            if (result.rows.length > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).send("Mídia não encontrada");
            }
            console.log(result.rows[0]);
        } catch (erro) {
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

    static async listaSeriePorTitulo (req, res) {
        let title = req.query.title;
        let connection;
        try {
            connection = await conectar();
            const result = await connection.execute(`SELECT * FROM media WHERE UPPER(title) LIKE UPPER(:title)`, [`%${title}%`]);
                                                    
            if (result.rows.length > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).send("Mídia não encontrada");
            }
            console.log(result.rows[0]);
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



  }

  export default SerieController;