// appIdentifier number to use in Nuvem Cívica.
export const APP_IDENTIFIER = 463;

// Visit posting type code to use in Nuvem Cívica.
export const VISIT_POSTING_TYPE_CODE = 381;

// Meeting posting type code to use in Nuvem Cívica.
export const MEETING_POSTING_TYPE_CODE = 386;

// Inspection posting type code to use in Nuvem Cívica.
export const INSPECTION_POSTING_TYPE_CODE = 388;

// Profile type code to use in Nuvem Cívica.
export const PROFILE_TYPE_CODE = 239;

// Link (GET) to authenticate user at Nuvem Cívica and get his Token.
export const AUTHENTICATE_LINK_NUVEM_CIVICA = 'http://mobile-aceite.tcu.gov.br:80/appCivicoRS/rest/pessoas/autenticar';

// Default Link to manipulate users at Nuvem Cívica.
export const DEFAULT_USER_LINK_NUVEM_CIVICA = 'http://mobile-aceite.tcu.gov.br:80/appCivicoRS/rest/pessoas/';

// Link to access posts at Nuvem Cívica.
export const POSTS_LINK_NUVEM_CIVICA = 'http://mobile-aceite.tcu.gov.br:80/appCivicoRS/rest/postagens/';

// Link to get schools at Nuvem Cívica.
export const SCHOOL_ENDPOINT = 'http://mobile-aceite.tcu.gov.br:80/nossaEscolaRS/rest/escolas';

// Default Link to manipulate a group at Nuvem Cívica.
export const DEFAULT_GROUP_LINK_NUVEM_CIVICA = 'http://mobile-aceite.tcu.gov.br:80/appCivicoRS/rest/grupos/';

// Link to get posts with full info at Nuvem Cívica.
export const FULL_INFO_POSTS_LINK_NUVEM_CIVICA = 'http://mobile-aceite.tcu.gov.br:80/appCivicoRS/rest/postagens/timeline';

// Counselor segment options.
export const EXECUTIVE_POWER = 'Poder executivo';
export const EDUCATION_WORKERS = 'Trabalhadores da educação';
export const STUDENT_PARENTS = 'Pais de alunos';
export const CIVILIAN_ENTITIES = 'Entidades civis';

// Counselor type options.
export const TITULAR_COUNSELOR = 'Titular';
export const SURROGATE_COUNSELOR = 'Suplente';

// Counselor CAE_Type options.
export const MUNICIPAL_COUNSELOR_CAE = 'Municipal';
export const STATE_COUNSELOR_CAE = 'Estadual';

// Counselor role options.
export const PRESIDENT_COUNSELOR = 'Presidente';
export const COMMON_COUNSELOR = 'Conselheiro';

// Alert messages and titles
export const REGISTER_FAIL_TITLE = 'FALHA NO CADASTRO';
export const USER_ALREADY_REGISTER_IN_APPLICATION = '\nUsuário já cadastrado na Aplicação.';
export const USER_JUST_ALREADY_REGISTER_IN_NUVEM = '\nUsuário já possui um cadastro na Nuvem Cívica ou em alguma aplicação que a utiliza.\n\nCaso queira utilizar esse e-mail, insira a senha utilizada para realizar o Login na Nuvem Cívica com o e-mail informado.\n\nCaso contrário cadastre-se com o outro e-mail não vinculado a Nuvem Cívica ainda.';
export const SEND_EMAIL_ALERT_TITLE = 'Agendamento Realizado';
export const SEND_EMAIL_ALERT_BODY = 'Deseja convidar um agente para essa visita? Se a resposta for sim, seu aplicativo de email padrão será aberto com as informações já preenchidas. Caso não tenha um aplicativo de email, será necessário baixar algum.';
export const FINISH_INSPECTION = 'Realmente deseja encerrar sua fiscalização e submeter os dados registrados? Essa ação é irreversível.';
export const LEAVING_INSPECTION = 'Caso saia da sessão de fiscalização atual, você perderá todos os dados já preenchidos e a fiscalização não será concluída. Realmente deseja sair da fiscalização?';

// Toast messages
export const LOGIN_PASSWORD_ERROR = 'Usuário não cadastrado na aplicação ou a senha está errada.';
export const LOGIN_PROFILE_ERROR = 'Usuário não cadastrado na aplicação ou perfil não encontrado.';
export const LOGIN_SUCCEED = 'Login realizado com sucesso!';
export const REGISTER_SUCCEED = 'Cadastro realizado com sucesso!';
export const REGISTER_NUVEM_ERROR = 'Usuário não cadastrado na Nuvem ou perfil não existe.';
export const EDIT_SUCCEED = 'Dados alterados com sucesso!';
export const INTERNAL_ERROR = 'Erro interno. Tente novamente mais tarde!';

export const SCHOOL_NOT_FOUND = 'Nenhuma escola encontrada! Verifique se foi digitado corretamente.';
export const ERROR_FIND_SCHOOL = 'Erro ao procurar escola. Tente novamente mais tarde.';
export const COUNSELOR_DISABLED_SUCCESS = 'Conselheiro desassociado com sucesso!';
export const COUNSELOR_DISABLED_FAILED = 'Erro ao desassociar conselheiro da aplicação!';
export const COUNSELOR_GROUP_DISABLED_SUCCESS = 'Conselheiro apagado do grupo (CAE) com sucesso!';
export const COUNSELOR_GROUP_DISABLED_FAILED = 'Não foi possível apagar conselheiro do grup (CAE).';
