const User = require("../models/User");
const dateLib = require('date-fns');
const bcrypt = require("bcrypt");

async function createUser(req, res) {
    const { name, email, password, city, phone, age, sex, cpf } = req.body;
    console.log(req.body);

    try {
      const verifyEmail = await User.findOne({ where: { email } })

      const verifyCpf =  await User.findOne({ where: { cpf } })

      const verifyPhone = await User.findOne({ where: { phone } })

      // Salvar os os objetos
      if (verifyEmail) {
        return res.render("cadastro", { massage: "Email já cadastrado" });
      }
      if (verifyCpf) {
        return res.render("cadastro", { massage: "CPF já cadastrado" });
      }
      if (verifyPhone) {
        return res.render("cadastro", { massage: "Telefone já cadastrado" });
      }

      const idade = dateLib.differenceInYears(new Date(), age)

      // Gerar um hash para a senha
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(idade);

      // Gerar um hash para o CPF
      const hashedCpf = await bcrypt.hash(cpf, 10);

      // Gerar um hash para o telefone
      const hashedPhone = await bcrypt.hash(phone, 10);

      // Criptografando as senhas e salvando usuário
      await User.create({ 
          name, 
          email, 
          phone: hashedPhone, 
          cpf: hashedCpf, 
          password: hashedPassword, 
          city, 
          age: idade,
          sex
      });
      return res.redirect("/cardapio");
    } catch (error) {
      console.error(error);
      return res.status(500).send('<p>Ocorreu um erro ao processar a solicitação</p>');
    }
}

// Update
async function updateUser(req, res) {
  // Desestruturação para obter dados do corpo da requisição (formulario)
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Verificar se o email já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.render("update", { massage: "Usuário não encontrado"});
    }

    // Atualizar as informações do usuário com a nova senha criptografada, se fornecida
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    // Salvar as alterações no banco de dados
    await existingUser.save();

    return res.render("update", { massage: "Senha atualizada" });
  } catch (error) {
    console.error(error);
    return res.status(500).send('<p>Ocorreu um erro ao processar a solicitação</p>');
  }
}


/* CONTROLLER DE LOGIN */
async function authUser(req, res) {
  const { email, password } = req.body;

  try {
      // Verificar se o usuário com o e-mail fornecido existe no banco de dados
      const user = await User.findOne({ where: { email } });

      // Se o usuário não existir, retornar uma mensagem de erro
      if (!user) {
          return res.render("login", { message: "E-mail não encontrado" });
      }

      // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
      const passwordMatch = await bcrypt.compare(password, user.password);

      // Se a senha não corresponder, retornar uma mensagem de erro
      if (!passwordMatch) {
          return res.render("login", { message: "Senha incorreta" });
      }

      // Autenticação bem-sucedida, redirecionar para a página principal ou realizar alguma ação desejada
      return res.redirect("/cardapio");
  } catch (error) {
      console.error(error);
      return res.status(500).send('<p>Ocorreu um erro ao processar a solicitação</p>');
  }
}



module.exports = {
  createUser,
  updateUser,
  authUser
}