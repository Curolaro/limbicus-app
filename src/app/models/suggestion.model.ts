export interface Reply {
    id: string;
    autor: string;
    mensagem: string;
    data_resposta: number;
}

export interface Suggestion {
    id?: string;
    titulo: string;
    descricao: string;
    status: 'pendente' | 'aprovada' | 'recusada';
    data_envio: number;
    id_usuario: string;
    categoria: string;
    respostas: Reply[];
}