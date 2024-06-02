import oracledb from "oracledb";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function conectar() {
    let connection;

    try {
        connection = await oracledb.getConnection({
        user: process.env.DB_CONNECTION_USER ,
        password: process.env.DB_CONNECTION_PASSWORD,
        connectString: process.env.DB_CONNECTION_STRING
        });
        
        oracledb.autoCommit = true;

        console.log('Conexão com o banco de dados estabelecida com sucesso.');

    } catch (err) {
        console.error(err);
    }

    return connection;
}

function transformarRetorno(lista) {
    let objeto = lista.map(element => {
        return {     
            "userId": element[0],
            "userName": element[1],
            "password": element[2],
            "email": element[3],
            "dateJoined": element[4]
        };
    });

    return objeto;
}

function transformarUsuarioRetorno(lista) {
    let objeto = lista.map(element => {
        return {     
            "userId": element[0],
            "userName": element[1],
            "email": element[3],
            "dateJoined": element[4]
        };
    });

    return objeto;
}


class UsuarioController {

    static async checkToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ msg: 'Acesso negado!' })
        }

        try {
            const secret = process.env.SECRET;
            jwt.verify(token, secret)
            next();

        } catch (error) {
            res.status(400).json({ msg: "Token inválido!" })
        }
    }


    static async login(req, res) {
        let connection;
        connection = await conectar();
        const { email, password } = req.body;
        try {
            const result = await connection.execute(`SELECT * FROM table_users WHERE email = (:email)`, { email});
            if (result.rows.length > 0) {
                const user = transformarRetorno(result.rows)
                const passwordMatch = await bcrypt.compare(password,result.rows[0][2].toString());
                if (passwordMatch) {
                    const secret = process.env.SECRET;
                    const token = jwt.sign({
                    email: req.body.email },
                     secret,
                    { expiresIn: '168h' }
                    );
                   res.status(200).json({ message: 'Login bem-sucedido!', user, msg:'Autenticação realizada com sucesso', token});
                    // res.status(200).json({ success: true, user/*, token*/ });
                    console.log(user);
                } else {
                    res.status(401).json({ message: 'Usuário ou senha incorretos'});
                }
            } 
            else {
                res.status(401).json({ userFound: false });
            }
           
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ message: 'Erro ao realizar o login'});
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


    static async cadastro(req, res) {
        let connection;
        connection = await conectar();

        const { username, email } = req.body;
        let password = req.body.password;
        if (!username) {
            return res.status(422).json({ msg: 'O nome é obrigatorio' })
        }
        if (!password) {
            return res.status(422).json({ msg: 'A senha é obrigatorio' })
        }
        if (!email) {
            return res.status(422).json({ msg: 'O email é obrigatorio' })
        }

        try {
            // Verifica se o usuário já existe no banco de dados
            //  const existingUsers = await connection.execute(`SELECT * FROM users WHERE username = (:email)` , {email: email});

            //  if (existingUsers) {
            //      return res.status(422).json({ message: 'Email já cadastrado' });
            //  };
            const passwordHash = await bcrypt.hash(password.toString(), 10);
            password = passwordHash;
            const datejoined = new Date();
            await connection.execute(`INSERT INTO table_users (username, password, email, datejoined) VALUES (:username, :password, :email, :datejoined)`, { username, password, email, datejoined });
    
            res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ message: 'Erro ao cadastrar o usuário',error });
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

    static async listarUsuarios (req, res) {
        let connection;
        connection = await conectar();

        try {
            const result = await connection.execute(`
            SELECT * 
            FROM TABLE_USERS `);  

            const obj = transformarUsuarioRetorno(result.rows);
            console.log(obj);
            res.status(200).json(obj);
        } catch (error) {
            res.status(400).json({ message: `${error.message}` });
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

    static async listarUsuariosPorId(req, res) {
        let connection;
        let id = req.query.id;
        connection = await conectar();

        try {
            const result = await connection.execute(`
            SELECT * 
            FROM TABLE_USERS WHERE ID = :id`, [{id}]);  

            const obj = transformarUsuarioRetorno(result.rows);
            console.log(obj);
            res.status(200).json(obj);
        } catch (error) {
            res.status(400).json({ message: `${error.message}` });
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

