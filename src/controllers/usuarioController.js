import oracledb from "oracledb";


async function conectar() {
    let connection;
  
    try {
      connection = await oracledb.getConnection({
        user: 'API',
        password: 'api',
        connectString: "localhost/XEPDB1"
      });
  
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
  
    } catch (err) {
      console.error(err);
    }
  
    return connection;
  }


class UsuarioController {

    static async login (req, res) {
        const { username, password } = req.body;

    try {
        const result = await connection.execute(`SELECT * FROM users WHERE username = (:username) AND password = (:password)`, [username, password]);

        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ message: 'Usuário ou senha incorretos' });
        }
        console.log(result.rows)
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro ao realizar o login' });
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


  static async cadastro (req, res) {
    const { username, password, email } = req.body;

    try {
        // Verifica se o usuário já existe no banco de dados
        const [existingUsers] = await connection.execute(`SELECT * FROM users WHERE username = (:username)`, [username]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Usuário já cadastrado' });
        }
        await connection.execute(`INSERT INTO users (username, password, email) VALUES ((:username), (:password), (:email) )`, [username, password, email]);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro ao cadastrar o usuário' });
    } finally {
        if (connection) {
          try {
              await connection.close();
          } catch (err) {
              console.error(err);
          }
        }
    }
};


};

export default UsuarioController;

