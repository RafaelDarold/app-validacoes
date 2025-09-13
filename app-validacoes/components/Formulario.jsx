import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from '../styles/globalStyles';

export default function Formulario() {
    const [nome, setNome] = useState('');
    const [nomeError, setNomeError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateForm = () => {
        let isValid = true;

        if(!nome.trim()){
            setNomeError("Nome é obrigadorio!")
            isValid = false;
        }else{
            setNomeError("");
        }
        if(!email.trim()){
            setEmailError("Email é obrigadorio!")
            isValid = false;
        }else{
            
            setEmailError("");
        }

        return isValid;
    };
    const handleSubmit = () => {
        if(validateForm()){
            const dados = { nome, email }
            console.log("Dados do formulario validos", dados);
            Alert.alert("Sucesso!!!", "Formulario enviado com sucesso!");
            alert("Sucesso!!!");

            // Reset form
            setNome("");
            setEmail("");
        }else{
            Alert.alert("Erro!!!", "Formulario não enviado!");
            alert("Erro!!!");
        }
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.scrollContent}>
                <Text style={globalStyles.title}>Formulario</Text>

                <View style={globalStyles.inputContainer}>
                    <TextInput
                        style={[globalStyles.input, nomeError && globalStyles.inputError]}
                        placeholder="Nome Completo"
                        value={nome}
                        onChangeText={setNome}
                    ></TextInput>
                    { nomeError ? <Text style={globalStyles.errorText}>{nomeError}</Text> : null}
                </View>
                <View style={globalStyles.inputContainer}>
                    <TextInput
                        style={[globalStyles.input, emailError && globalStyles.inputError]}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    ></TextInput>
                    { emailError ? <Text style={globalStyles.errorText}>{emailError}</Text> : null}
                </View>
                <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
                    <Text style={globalStyles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}