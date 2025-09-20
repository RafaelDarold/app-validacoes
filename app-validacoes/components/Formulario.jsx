import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, Button, Alert } from "react-native";
import styles from "../styles/globalStyles";

export default function Formularios() {
    // Estados
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [nomePai, setNomePai] = useState("");
    const [nomeMae, setNomeMae] = useState("");
    const [idade, setIdade] = useState(null);

    // Erros
    const [errors, setErrors] = useState({});

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, "");
      
        if (cpf.length !== 11) return false;
      
        if (/^(\d)\1{10}$/.test(cpf)) return false;
      
        let soma = 0;
        let resto;
      
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
      
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
      
        return true;
      }
      

    // Validações
    const validar = () => {
        let newErrors = {};

        // Nome
        if (!nome.trim() || nome.trim().split(" ").length < 2) {
            newErrors.nome = "Informe nome e sobrenome";
        }

        // Data nascimento
        const regexData = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!regexData.test(dataNascimento)) {
            newErrors.dataNascimento = "Data inválida (DD/MM/AAAA)";
        } else {
            const [dia, mes, ano] = dataNascimento.split("/").map(Number);
            const hoje = new Date();
            const nascimento = new Date(ano, mes - 1, dia);
            let idadeCalc = hoje.getFullYear() - nascimento.getFullYear();
            const mesAtual = hoje.getMonth() - nascimento.getMonth();
            if (mesAtual < 0 || (mesAtual === 0 && hoje.getDate() < nascimento.getDate())) {
                idadeCalc--;
            }
            setIdade(idadeCalc);
            if (idadeCalc < 0 || idadeCalc > 120) {
                newErrors.dataNascimento = "Idade inválida";
            }
        }

        // CPF
        if (!validarCPF(cpf)) {
            newErrors.cpf = "CPF inválido";
          }

        // Telefone fixo
        const regexFixo = /^\(\d{2}\)\s\d{4}-\d{4}$/;
        if (!regexFixo.test(telefone)) {
            newErrors.telefone = "Formato: (11) 2345-6789";
        }

        // Celular
        const regexCel = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        if (!regexCel.test(celular)) {
            newErrors.celular = "Formato: (11) 91234-5678";
        }

        // CEP
        const regexCep = /^\d{5}-?\d{3}$/;
        if (!regexCep.test(cep)) {
            newErrors.cep = "CEP inválido (XXXXX-XXX)";
        }

        // Email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            newErrors.email = "Email inválido";
        }

        // Senha
        if (senha.length < 8) {
            newErrors.senha = "Mínimo 8 caracteres";
        }
        if (senha !== confirmarSenha) {
            newErrors.confirmarSenha = "Senhas não coincidem";
        }

        // Menores de idade
        if (idade !== null && idade < 18) {
            if (!nomePai.trim()) newErrors.nomePai = "Obrigatório para menores de 18";
            if (!nomeMae.trim()) newErrors.nomeMae = "Obrigatório para menores de 18";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            Alert.alert("Sucesso", "Formulário válido!");
        }
    };

    // Função auxiliar para renderizar inputs
    const renderInput = (label, value, setter, placeholder, error, keyboardType = "default", secure = false) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                value={value}
                onChangeText={setter}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secure}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Informações Pessoais */}
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            {renderInput("Nome Completo", nome, setNome, "Ex: João Silva", errors.nome)}
            {renderInput("Data de Nascimento", dataNascimento, setDataNascimento, "DD/MM/AAAA", errors.dataNascimento, "numeric")}
            {renderInput("CPF", cpf, setCpf, "XXX.XXX.XXX-XX", errors.cpf, "numeric")}
            {renderInput("Telefone Fixo", telefone, setTelefone, "(11) 2345-6789", errors.telefone)}
            {renderInput("Celular", celular, setCelular, "(11) 91234-5678", errors.celular)}

            {/* Informações Complementares */}
            {idade !== null && idade < 18 && (
                <>
                    <Text style={styles.sectionTitle}>Informações Complementares</Text>
                    {renderInput("Nome do Pai", nomePai, setNomePai, "", errors.nomePai)}
                    {renderInput("Nome da Mãe", nomeMae, setNomeMae, "", errors.nomeMae)}
                </>
            )}

            {/* Endereço */}
            <Text style={styles.sectionTitle}>Endereço</Text>
            {renderInput("CEP", cep, setCep, "XXXXX-XXX", errors.cep, "numeric")}
            {renderInput("Endereço", endereco, setEndereco, "Rua / Avenida", errors.endereco)}
            {renderInput("Número", numero, setNumero, "123", errors.numero, "numeric")}
            {renderInput("Complemento", complemento, setComplemento, "Opcional", null)}
            {renderInput("Cidade", cidade, setCidade, "Cidade", errors.cidade)}
            {renderInput("Estado", estado, setEstado, "Estado", errors.estado)}

            {/* Conta */}
            <Text style={styles.sectionTitle}>Informações da Conta</Text>
            {renderInput("Email", email, setEmail, "usuario@dominio.com", errors.email, "email-address")}
            {renderInput("Senha", senha, setSenha, "********", errors.senha, "default", true)}
            {renderInput("Confirmar Senha", confirmarSenha, setConfirmarSenha, "********", errors.confirmarSenha, "default", true)}

            <View style={{ marginVertical: 20 }}>
                <Button title="Validar Formulário" onPress={validar} />
            </View>
        </ScrollView>
    );
}