# 🔥 Kidde Market Intelligence Dashboard

Dashboard automatizado e **100% GRATUITO** para monitoramento do mercado de Detecção e Alarme de Incêndio na América Latina.

## 🌟 Características

- ✅ **Totalmente gratuito** - Usa apenas serviços e APIs gratuitas
- 🤖 **Atualização automática diária** - Via GitHub Actions
- 📊 **Coleta de dados em tempo real** - De múltiplas fontes públicas
- 🌐 **Hospedagem grátis** - GitHub Pages
- 📱 **Responsivo** - Funciona em desktop e mobile
- 🔄 **Zero manutenção** - Roda automaticamente todos os dias

## 🚀 Setup Rápido (15 minutos)

### 1. Fork este repositório

Clique em "Fork" no canto superior direito do GitHub.

### 2. Configure as APIs gratuitas

Você precisará criar contas GRATUITAS em:

#### a) Serper.dev (Busca Web)
1. Acesse: https://serper.dev/
2. Crie conta gratuita (2.500 buscas/mês)
3. Copie sua API Key
4. **Custo:** $0/mês

#### b) NewsAPI.org (Notícias)
1. Acesse: https://newsapi.org/
2. Crie conta gratuita (100 requests/dia)
3. Copie sua API Key
4. **Custo:** $0/mês

#### c) Anthropic Claude API (Análise Inteligente - OPCIONAL)
1. Acesse: https://console.anthropic.com/
2. Crie conta e adicione $5 de crédito inicial
3. Copie sua API Key
4. **Custo:** ~$0.50/mês (uso baixo)

### 3. Configure GitHub Secrets

No seu fork, vá em: **Settings → Secrets and variables → Actions → New repository secret**

Adicione as seguintes secrets:

```
SERPER_API_KEY: sua_key_do_serper
NEWS_API_KEY: sua_key_do_newsapi
ANTHROPIC_API_KEY: sua_key_do_anthropic (opcional)
```

### 4. Ative GitHub Actions

1. Vá em **Actions** no seu repositório
2. Clique em "I understand my workflows, go ahead and enable them"
3. Pronto! O workflow rodará automaticamente todo dia às 6:00 AM UTC

### 5. Ative GitHub Pages

1. Vá em **Settings → Pages**
2. Em "Source", selecione: `gh-pages` branch
3. Clique em "Save"
4. Seu dashboard estará disponível em: `https://seu-usuario.github.io/kidde-dashboard`

## 📁 Estrutura do Projeto

```
kidde-dashboard/
├── .github/
│   └── workflows/
│       └── update-data.yml          # Automação diária
├── scripts/
│   ├── collect_data.py              # Coleta dados de APIs gratuitas
│   └── generate_dashboard.py       # Gera HTML estático
├── data/
│   └── market_data.json             # Dados coletados (gerado automaticamente)
├── public/
│   └── index.html                   # Dashboard final (gerado automaticamente)
├── requirements.txt                 # Dependências Python
└── README.md                        # Este arquivo
```

## 🔄 Como Funciona

### Fluxo Automático Diário:

```
1. GitHub Actions dispara às 6:00 AM UTC
         ↓
2. Script Python coleta dados de:
   - Serper.dev (buscas web)
   - NewsAPI (notícias do setor)
   - Web scraping de sites públicos
   - APIs governamentais abertas
         ↓
3. Claude API analisa e estrutura dados (opcional)
         ↓
4. Gera JSON com dados limpos
         ↓
5. Cria HTML estático do dashboard
         ↓
6. Commit automático para o repositório
         ↓
7. Deploy automático no GitHub Pages
         ↓
8. Dashboard atualizado está no ar! 🎉
```

## 📊 Fontes de Dados (TODAS GRATUITAS)

| Tipo de Dado | Fonte | Limite Gratuito | Custo |
|--------------|-------|-----------------|-------|
| Busca Web | Serper.dev | 2.500/mês | $0 |
| Notícias | NewsAPI | 100/dia | $0 |
| Análise IA | Anthropic Claude | Pay-as-you-go | ~$0.50/mês |
| Hospedagem | GitHub Pages | Ilimitado | $0 |
| Automação | GitHub Actions | 2.000 min/mês | $0 |
| **TOTAL** | | | **$0.50/mês** |

## 🎯 O Que é Coletado Automaticamente

- ✅ Regulamentações e normas (ABNT, NOM, etc.)
- ✅ Movimentações de concorrentes
- ✅ Lançamentos de produtos
- ✅ Grandes projetos e licitações
- ✅ Movimentações de pessoas (LinkedIn/notícias)
- ✅ Dados macroeconômicos
- ✅ Notícias do setor

## 🔧 Personalização

### Adicionar novos concorrentes:

Edite `scripts/collect_data.py`, seção `collect_competitor_moves()`:

```python
competitors = [
    'Honeywell fire detection',
    'Intelbras alarme incêndio',
    'Bosch fire systems',
    'Tyco fire detection',
    'SEU_CONCORRENTE aqui',  # ← Adicione aqui
]
```

### Mudar horário de atualização:

Edite `.github/workflows/update-data.yml`:

```yaml
schedule:
  - cron: '0 6 * * *'  # ← Mude aqui (formato: minuto hora * * *)
  # Exemplo: '0 14 * * *' = 14:00 UTC (11:00 Brasília)
```

### Adicionar novas seções:

1. Adicione coleta em `scripts/collect_data.py`
2. Adicione renderização em `scripts/generate_dashboard.py`

## 🐛 Troubleshooting

### Workflow não está rodando?

1. Verifique se GitHub Actions está ativado
2. Verifique se as secrets estão configuradas
3. Veja logs em: Actions → Update Data → Ver detalhes

### Dashboard em branco?

1. Verifique se GitHub Pages está ativado
2. Aguarde 5 minutos após primeiro commit
3. Limpe cache do navegador (Ctrl+F5)

### Poucos dados sendo coletados?

1. Verifique se as API keys são válidas
2. Verifique limites de uso das APIs gratuitas
3. Aumente o número de resultados em `collect_data.py`

## 📈 Próximas Melhorias

- [ ] Adicionar gráficos interativos (Chart.js)
- [ ] Integração com Google Sheets para dados históricos
- [ ] Alertas via email para eventos importantes
- [ ] Export de relatórios em PDF
- [ ] Comparação histórica de preços
- [ ] Mapa interativo de projetos

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📄 Licença

MIT License - Use livremente!

## 🆘 Suporte

Dúvidas? Abra uma [Issue](https://github.com/seu-usuario/kidde-dashboard/issues)

---

Desenvolvido com ❤️ para Kidde | Atualizado automaticamente via GitHub Actions

**⭐ Se este projeto te ajudou, dê uma estrela no repositório!**
