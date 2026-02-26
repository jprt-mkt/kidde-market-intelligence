# 🎯 Guia Completo de Instalação - Passo a Passo

## ⏱️ Tempo estimado: 15 minutos

---

## 📋 Pré-requisitos

- Uma conta no GitHub (gratuita)
- Um navegador web
- 15 minutos do seu tempo

**NÃO É NECESSÁRIO:**
- ❌ Conhecimento de programação
- ❌ Instalar nada no seu computador
- ❌ Servidor próprio
- ❌ Cartão de crédito (exceto para Claude API, opcional)

---

## 🚀 Parte 1: Configurar as APIs Gratuitas (5 min)

### 1.1 Serper.dev (Busca Web)

1. Acesse: https://serper.dev/
2. Clique em "Sign Up" no canto superior direito
3. Cadastre-se com seu email
4. Após login, vá em "Dashboard"
5. Copie sua API Key (algo como: `abc123xyz456...`)
6. **IMPORTANTE:** Guarde esta chave em um bloco de notas

**Plano gratuito:** 2.500 buscas por mês (mais que suficiente!)

---

### 1.2 NewsAPI.org (Notícias)

1. Acesse: https://newsapi.org/
2. Clique em "Get API Key"
3. Preencha o formulário:
   - Nome
   - Email
   - Selecione: "I'm using it for personal/educational use"
4. Confirme seu email
5. Faça login e copie sua API Key
6. **IMPORTANTE:** Guarde esta chave no bloco de notas

**Plano gratuito:** 100 requisições por dia (suficiente para uso diário)

---

### 1.3 Claude API (OPCIONAL - Análise Inteligente)

Esta etapa é opcional mas recomendada para análises mais precisas.

1. Acesse: https://console.anthropic.com/
2. Crie uma conta
3. Vá em "API Keys" → "Create Key"
4. Adicione $5 de crédito inicial (via cartão)
5. Copie a API Key
6. **IMPORTANTE:** Guarde esta chave no bloco de notas

**Custo estimado:** $0.30-0.50 por mês com uso leve

---

## 🔧 Parte 2: Configurar o GitHub (5 min)

### 2.1 Fork o Repositório

1. Acesse o repositório: `https://github.com/[REPO-ORIGINAL]/kidde-dashboard`
2. Clique no botão "Fork" no canto superior direito
3. Aguarde alguns segundos
4. Pronto! Agora você tem sua própria cópia do projeto

---

### 2.2 Configurar as Secrets (API Keys)

**MUITO IMPORTANTE:** As API Keys devem ser mantidas em segredo!

1. No seu fork, vá em: **Settings** (configurações)
2. No menu lateral esquerdo, clique em: **Secrets and variables** → **Actions**
3. Clique em **"New repository secret"**

Agora adicione CADA secret separadamente:

#### Secret 1: SERPER_API_KEY
- **Name:** `SERPER_API_KEY`
- **Secret:** Cole a chave do Serper.dev
- Clique em "Add secret"

#### Secret 2: NEWS_API_KEY
- Clique em "New repository secret" novamente
- **Name:** `NEWS_API_KEY`
- **Secret:** Cole a chave do NewsAPI
- Clique em "Add secret"

#### Secret 3: ANTHROPIC_API_KEY (opcional)
- Clique em "New repository secret" novamente
- **Name:** `ANTHROPIC_API_KEY`
- **Secret:** Cole a chave da Anthropic
- Clique em "Add secret"

**✅ Resultado:** Você deve ter 2 ou 3 secrets configuradas

---

### 2.3 Ativar GitHub Actions

1. Clique na aba **Actions** no topo do repositório
2. Você verá uma mensagem: "Workflows aren't being run on this forked repository"
3. Clique no botão verde: **"I understand my workflows, go ahead and enable them"**
4. Pronto! As automações estão ativadas

---

### 2.4 Ativar GitHub Pages (Hospedagem)

1. Vá em **Settings** novamente
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione:
   - **Branch:** `gh-pages` (se não existir ainda, selecione `main` por enquanto)
   - **Folder:** `/ (root)`
4. Clique em **Save**

**Seu site estará em:** `https://seu-usuario.github.io/kidde-dashboard`

---

## 🎯 Parte 3: Primeira Execução (5 min)

### 3.1 Executar Manualmente pela Primeira Vez

1. Vá para a aba **Actions**
2. No menu lateral esquerdo, clique em: **"Atualização Diária do Dashboard"**
3. Clique no botão **"Run workflow"** (canto direito)
4. Selecione `main` branch
5. Clique em **"Run workflow"** verde

### 3.2 Acompanhar a Execução

1. Aguarde alguns segundos, depois atualize a página
2. Você verá um workflow rodando (bolinha amarela 🟡)
3. Clique nele para ver os detalhes
4. Aguarde 2-3 minutos até completar (bolinha verde ✅)

### 3.3 Ver seu Dashboard

1. Após o workflow completar com sucesso
2. Aguarde mais 1-2 minutos para o deploy
3. Acesse: `https://seu-usuario.github.io/kidde-dashboard`
4. **🎉 PRONTO! Seu dashboard está no ar!**

---

## 🔄 Funcionamento Automático

Após a primeira execução manual, o sistema rodará **automaticamente**:

- **Quando:** Todo dia às 6:00 AM UTC (3:00 AM horário de Brasília)
- **O que faz:**
  1. Coleta dados novos das APIs
  2. Analisa e estrutura informações
  3. Atualiza o dashboard
  4. Faz commit automático
  5. Publica a nova versão

**Você não precisa fazer NADA!** ✨

---

## ✅ Checklist de Verificação

Antes de finalizar, confirme:

- [ ] Tenho 2-3 API Keys configuradas nas Secrets
- [ ] GitHub Actions está ativo (bolinha verde)
- [ ] GitHub Pages está ativado
- [ ] Executei o workflow manualmente pela primeira vez
- [ ] Consigo acessar meu dashboard no link do GitHub Pages
- [ ] Vejo dados no dashboard (mesmo que sejam dados de exemplo)

---

## 🐛 Problemas Comuns

### "Workflow failed" - Falha na execução

**Causa:** API Keys incorretas ou não configuradas

**Solução:**
1. Vá em Settings → Secrets
2. Verifique se os nomes estão exatamente: `SERPER_API_KEY` e `NEWS_API_KEY`
3. Verifique se copiou as chaves corretamente (sem espaços)
4. Execute o workflow novamente

---

### "404 - Page not found" ao acessar o dashboard

**Causa:** GitHub Pages ainda não foi publicado

**Solução:**
1. Aguarde 5 minutos após o primeiro workflow bem-sucedido
2. Vá em Settings → Pages e confirme que está ativo
3. O link correto é: `seu-usuario.github.io/nome-do-repo`
4. Limpe o cache do navegador (Ctrl+Shift+R)

---

### Dashboard em branco ou só com cabeçalho

**Causa:** Primeira execução pode ter dados limitados

**Solução:**
1. Aguarde o próximo dia útil
2. Execute o workflow manualmente de novo
3. Verifique os logs do workflow para erros

---

### API retornando erro de limite

**Causa:** Você excedeu o limite gratuito

**Solução:**
1. **Serper:** Aguarde até o próximo mês (2.500 buscas)
2. **NewsAPI:** Aguarde até o próximo dia (100 requests)
3. Considere criar uma segunda conta (use outro email)

---

## 📞 Precisa de Ajuda?

- **Issues no GitHub:** Abra uma issue no repositório
- **Email:** [seu-email-de-suporte]
- **Documentação completa:** Ver README.md

---

## 🎓 Próximos Passos

Agora que está funcionando, você pode:

1. **Personalizar:** Adicione seus próprios concorrentes e palavras-chave
2. **Expandir:** Adicione novas seções ao dashboard
3. **Compartilhar:** Envie o link para sua equipe
4. **Contribuir:** Melhore o código e abra um Pull Request

---

## 🎉 Parabéns!

Você configurou um sistema de inteligência de mercado profissional, totalmente automatizado e gratuito!

**O que você tem agora:**
- ✅ Dashboard profissional
- ✅ Atualização automática diária
- ✅ Dados em tempo real
- ✅ Hospedagem gratuita
- ✅ Zero manutenção

**Custo total:** $0-0.50/mês

---

**Aproveite seu dashboard! 🚀**
