# ⚡ Início Rápido - 5 Minutos

## 🎯 Seu objetivo

Ter um dashboard de inteligência de mercado funcionando **HOJE**, totalmente **GRÁTIS** e **AUTOMATIZADO**.

---

## 📝 O que você vai precisar

1. ✅ Conta no GitHub (criar em 2 min: https://github.com/signup)
2. ✅ 2 API Keys gratuitas (15 min total)
3. ✅ Seguir este guia

**Custo:** $0/mês (ou $0.50/mês se usar Claude API opcional)

---

## 🚀 Passo a Passo ULTRA-RESUMIDO

### 1️⃣ Obter API Keys (10 min)

**Serper.dev** (busca web - OBRIGATÓRIO)
- Acesse: https://serper.dev/
- Clique "Sign Up" → Cadastre-se
- Copie sua API Key
- 📋 Cole num bloco de notas

**NewsAPI** (notícias - OBRIGATÓRIO)
- Acesse: https://newsapi.org/
- Clique "Get API Key" → Cadastre-se
- Copie sua API Key
- 📋 Cole no bloco de notas

**Anthropic Claude** (análise IA - OPCIONAL)
- Acesse: https://console.anthropic.com/
- Cadastre-se → Adicione $5 de crédito
- Copie sua API Key
- 📋 Cole no bloco de notas

---

### 2️⃣ Configurar GitHub (3 min)

1. **Fork este repositório**
   - Clique em "Fork" no topo desta página
   - Aguarde 10 segundos

2. **Adicionar as API Keys**
   - No SEU fork: Settings → Secrets → Actions
   - "New repository secret"
   - Adicione cada uma:
     - Nome: `SERPER_API_KEY` → Valor: sua chave Serper
     - Nome: `NEWS_API_KEY` → Valor: sua chave NewsAPI
     - Nome: `ANTHROPIC_API_KEY` → Valor: sua chave Claude (se tiver)

3. **Ativar Actions**
   - Aba "Actions" → "Enable workflows"

4. **Ativar Pages**
   - Settings → Pages
   - Source: gh-pages (ou main)
   - Save

---

### 3️⃣ Primeira Execução (2 min)

1. Vá em **Actions**
2. "Atualização Diária do Dashboard"
3. "Run workflow" → "Run workflow"
4. Aguarde 2-3 minutos (bolinha verde ✅)

---

### 4️⃣ Ver seu Dashboard (30 seg)

Acesse: `https://SEU-USUARIO.github.io/NOME-DO-REPO`

🎉 **PRONTO!** Seu dashboard está no ar!

---

## ⏰ E Agora?

O sistema rodará **automaticamente** todo dia às 6:00 AM UTC (3:00 AM Brasília).

**Você não precisa fazer mais NADA!**

Só acessar o link quando quiser ver os dados atualizados.

---

## 🆘 Problemas?

**Workflow falhou?**
- Verifique se as API Keys estão corretas
- Veja os logs em Actions → clique no workflow → ver detalhes

**404 no link do dashboard?**
- Aguarde 5 minutos
- Verifique se GitHub Pages está ativo

**Precisa de ajuda detalhada?**
- Leia: [SETUP-PT.md](./SETUP-PT.md) (guia completo)

---

## 📚 Próximos Passos

- ✏️ Personalize os concorrentes em `scripts/collect_data.py`
- 🎨 Customize o visual em `scripts/generate_dashboard.py`
- ⏰ Mude o horário em `.github/workflows/update-data.yml`
- 🌟 Dê uma estrela neste repo se ajudou!

---

**Tempo total:** 15 minutos
**Resultado:** Sistema profissional de inteligência de mercado GRÁTIS!

🚀 **Comece agora!**
