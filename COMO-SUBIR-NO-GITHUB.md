# 🎯 COMO SUBIR ESTE PROJETO NO GITHUB

## 📦 Você recebeu

Uma pasta completa com todo o código necessário para rodar seu dashboard automatizado!

## 🚀 Opção 1: Upload via Interface do GitHub (MAIS FÁCIL)

### Passo a Passo:

1. **Criar repositório no GitHub:**
   - Acesse: https://github.com/new
   - Nome: `kidde-market-intelligence`
   - Descrição: "Dashboard automatizado de inteligência de mercado"
   - ✅ Marque "Public"
   - ❌ NÃO marque "Add README"
   - Clique "Create repository"

2. **Upload dos arquivos:**
   - Na página do seu novo repositório
   - Clique em "uploading an existing file"
   - ARRASTE toda a pasta `kidde-dashboard-free` para a área de upload
   - OU clique "choose your files" e selecione TODOS os arquivos
   - Escreva "Initial commit" na descrição
   - Clique "Commit changes"

3. **Configurar Secrets (API Keys):**
   - No repositório: Settings → Secrets and variables → Actions
   - Clique "New repository secret"
   - Adicione cada uma:
     ```
     Nome: SERPER_API_KEY
     Valor: [sua chave do Serper.dev]
     
     Nome: NEWS_API_KEY
     Valor: [sua chave do NewsAPI]
     
     Nome: ANTHROPIC_API_KEY (opcional)
     Valor: [sua chave do Claude]
     ```

4. **Ativar GitHub Actions:**
   - Vá em "Actions"
   - Clique "I understand my workflows, go ahead and enable them"

5. **Ativar GitHub Pages:**
   - Settings → Pages
   - Source: gh-pages (se disponível) ou main
   - Folder: / (root)
   - Save

6. **Primeira execução:**
   - Actions → "Atualização Diária do Dashboard"
   - "Run workflow" → "Run workflow"
   - Aguarde 2-3 minutos

7. **Acessar dashboard:**
   - `https://seu-usuario.github.io/kidde-market-intelligence`

---

## 🖥️ Opção 2: Upload via Git CLI (Para usuários avançados)

```bash
# 1. Navegar até a pasta do projeto
cd caminho/para/kidde-dashboard-free

# 2. Inicializar repositório
git init

# 3. Adicionar todos os arquivos
git add .

# 4. Fazer primeiro commit
git commit -m "Initial commit: Dashboard Kidde automatizado"

# 5. Conectar com repositório remoto
git remote add origin https://github.com/SEU-USUARIO/kidde-market-intelligence.git

# 6. Fazer push
git branch -M main
git push -u origin main
```

Depois siga os passos 3-7 da Opção 1 (Secrets, Actions, Pages, etc.)

---

## 📋 Checklist Pós-Upload

Antes de finalizar, verifique:

- [ ] Todos os arquivos foram enviados (especialmente a pasta .github/workflows)
- [ ] Secrets estão configurados (mínimo: SERPER_API_KEY e NEWS_API_KEY)
- [ ] GitHub Actions está ativo
- [ ] GitHub Pages está ativo
- [ ] Executou o workflow manualmente pela primeira vez
- [ ] Dashboard está acessível no link do GitHub Pages

---

## 🗂️ Estrutura de Arquivos (Importante!)

Certifique-se que sua estrutura ficou assim:

```
kidde-market-intelligence/
├── .github/
│   └── workflows/
│       └── update-data.yml          ← CRÍTICO!
├── scripts/
│   ├── collect_data.py
│   └── generate_dashboard.py
├── data/
│   └── market_data_example.json
├── .gitignore
├── LICENSE
├── README.md
├── SETUP-PT.md
├── QUICKSTART.md
├── requirements.txt
└── test_local.py
```

**ATENÇÃO:** O arquivo `.github/workflows/update-data.yml` é ESSENCIAL!

Se a pasta `.github` não subiu (às vezes pastas com `.` são ocultas):

1. No seu computador, mostre arquivos ocultos
2. No GitHub, clique "Add file" → "Create new file"
3. Digite: `.github/workflows/update-data.yml`
4. Cole o conteúdo do arquivo
5. Commit

---

## 🆘 Problemas Comuns

### GitHub não mostra a pasta .github

**Causa:** Pastas com `.` são ocultas em alguns sistemas

**Solução:**
- Windows: Explorador → Exibir → Itens ocultos
- Mac: Cmd+Shift+. no Finder
- Ou use a Opção 2 (Git CLI)

### Workflow não aparece em Actions

**Causa:** Arquivo update-data.yml não está em .github/workflows/

**Solução:**
- Verifique a estrutura de pastas
- Crie manualmente se necessário
- O caminho DEVE ser: `.github/workflows/update-data.yml`

### "Permission denied" ao fazer push

**Causa:** Você não tem permissão ou precisa autenticar

**Solução:**
- Use Personal Access Token (PAT) do GitHub
- Settings → Developer settings → Personal access tokens
- Gere um token com permissão `repo`
- Use o token como senha ao fazer push

---

## ✅ Pronto!

Após seguir estes passos, você terá:

- ✅ Repositório no GitHub
- ✅ Dashboard funcionando
- ✅ Atualização automática configurada
- ✅ Tudo 100% gratuito

**Próximo passo:** Abra o QUICKSTART.md para ver como usar!

---

## 📞 Precisa de Ajuda?

Veja os guias detalhados:
- [QUICKSTART.md](./QUICKSTART.md) - Início rápido
- [SETUP-PT.md](./SETUP-PT.md) - Guia completo passo a passo
- [README.md](./README.md) - Documentação técnica

---

**Boa sorte! 🚀**
