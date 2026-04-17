export interface User {
    uid: string;
    nome: string;
    email: string;
    data_criacao: number;
    cargo: 'user' | 'adm';
    estatisticas: {
        qnt_avaliacoes: number;
        qnt_respostas: number;
  };
}
