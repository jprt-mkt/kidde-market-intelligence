#!/usr/bin/env python3
"""
Script de coleta de dados para Dashboard Kidde
Usa apenas APIs e fontes GRATUITAS
"""

import os
import json
import requests
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import anthropic
import time

class DataCollector:
    def __init__(self):
        self.serper_key = os.getenv('SERPER_API_KEY')
        self.news_api_key = os.getenv('NEWS_API_KEY')
        self.anthropic_key = os.getenv('ANTHROPIC_API_KEY')
        self.data = {
            'lastUpdate': datetime.now().isoformat(),
            'regulations': [],
            'macroEconomic': [],
            'competitorMoves': [],
            'newProducts': [],
            'majorProjects': [],
            'peopleMovements': [],
            'experts': []
        }
    
    def search_web(self, query, num_results=5):
        """Busca web usando Serper.dev (2500 buscas grátis/mês)"""
        if not self.serper_key:
            print("⚠️  SERPER_API_KEY não configurada, usando dados simulados")
            return []
        
        url = "https://google.serper.dev/search"
        payload = json.dumps({"q": query, "num": num_results})
        headers = {
            'X-API-KEY': self.serper_key,
            'Content-Type': 'application/json'
        }
        
        try:
            response = requests.post(url, headers=headers, data=payload, timeout=10)
            response.raise_for_status()
            return response.json().get('organic', [])
        except Exception as e:
            print(f"Erro na busca '{query}': {e}")
            return []
    
    def get_news(self, query, days=7):
        """Busca notícias usando NewsAPI (100 requests/dia grátis)"""
        if not self.news_api_key:
            print("⚠️  NEWS_API_KEY não configurada")
            return []
        
        date_from = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
        url = f"https://newsapi.org/v2/everything"
        params = {
            'q': query,
            'from': date_from,
            'sortBy': 'publishedAt',
            'language': 'pt,es,en',
            'apiKey': self.news_api_key,
            'pageSize': 10
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json().get('articles', [])
        except Exception as e:
            print(f"Erro ao buscar notícias: {e}")
            return []
    
    def analyze_with_claude(self, content, prompt):
        """Usa Claude API para análise inteligente de dados"""
        if not self.anthropic_key:
            print("⚠️  ANTHROPIC_API_KEY não configurada")
            return None
        
        try:
            client = anthropic.Anthropic(api_key=self.anthropic_key)
            message = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1000,
                messages=[{
                    "role": "user",
                    "content": f"{prompt}\n\nConteúdo:\n{content}"
                }]
            )
            return message.content[0].text
        except Exception as e:
            print(f"Erro na análise com Claude: {e}")
            return None
    
    def collect_regulations(self):
        """Coleta informações sobre regulamentação"""
        print("📋 Coletando dados de regulamentação...")
        
        queries = [
            "ABNT NBR 17240 2025 norma detecção incêndio",
            "NOM-002-STPS México incêndio 2025",
            "Chile decreto incêndio 2025",
            "Colombia resolución sistemas detección incêndio"
        ]
        
        for query in queries:
            results = self.search_web(query, 3)
            news = self.get_news(query, days=30)
            
            # Processa resultados
            for result in results[:2]:
                self.data['regulations'].append({
                    'date': datetime.now().strftime('%Y-%m-%d'),
                    'country': self._extract_country(query),
                    'title': result.get('title', 'N/A'),
                    'impact': 'Alto',
                    'description': result.get('snippet', 'N/A'),
                    'source': result.get('link', '')
                })
            
            time.sleep(1)  # Rate limiting
    
    def collect_competitor_moves(self):
        """Coleta movimentações dos concorrentes"""
        print("🏢 Coletando movimentações da concorrência...")
        
        competitors = [
            'Honeywell fire detection',
            'Intelbras alarme incêndio',
            'Bosch fire systems',
            'Tyco fire detection',
            'Siemens fire safety'
        ]
        
        for competitor in competitors:
            query = f"{competitor} launch new product 2025 Latin America"
            news = self.get_news(query, days=14)
            
            for article in news[:2]:
                self.data['competitorMoves'].append({
                    'date': article.get('publishedAt', '')[:10],
                    'company': competitor.split()[0],
                    'action': 'Notícia',
                    'detail': article.get('title', 'N/A'),
                    'impact': 'Médio',
                    'source': article.get('url', '')
                })
            
            time.sleep(1)
    
    def collect_projects(self):
        """Coleta informações sobre grandes projetos"""
        print("🏗️ Coletando dados de projetos...")
        
        queries = [
            "licitação sistemas detecção incêndio Brasil 2025",
            "obras metrô detecção incêndio América Latina",
            "hospital sistemas alarme incêndio México",
            "shopping center fire detection Chile"
        ]
        
        for query in queries:
            results = self.search_web(query, 3)
            
            for result in results[:1]:
                self.data['majorProjects'].append({
                    'project': result.get('title', 'N/A'),
                    'country': self._extract_country(query),
                    'value': 'N/A',
                    'winner': 'Em licitação',
                    'status': 'Aberto',
                    'contacts': 'Verificar fonte',
                    'scope': result.get('snippet', 'N/A'),
                    'source': result.get('link', '')
                })
            
            time.sleep(1)
    
    def scrape_linkedin_jobs(self):
        """Scraping de movimentações de pessoas (LinkedIn jobs como proxy)"""
        print("👥 Coletando movimentações de pessoas...")
        
        # Busca por mudanças de emprego no setor
        queries = [
            "Honeywell fire detection hiring Latin America",
            "Bosch fire systems new manager",
            "Tyco fire detection appointment"
        ]
        
        for query in queries:
            results = self.search_web(query, 2)
            
            for result in results[:1]:
                if any(keyword in result.get('snippet', '').lower() for keyword in ['join', 'appoint', 'hire', 'new']):
                    self.data['peopleMovements'].append({
                        'date': datetime.now().strftime('%Y-%m-%d'),
                        'person': 'Verificar fonte',
                        'from': 'N/A',
                        'to': result.get('title', 'N/A'),
                        'impact': result.get('snippet', 'N/A')[:200]
                    })
    
    def collect_macro_data(self):
        """Coleta dados macroeconômicos de fontes públicas"""
        print("📊 Coletando dados macroeconômicos...")
        
        # Usa APIs públicas de dados econômicos
        countries = ['Brazil', 'Mexico', 'Chile', 'Colombia', 'Argentina']
        
        for country in countries:
            query = f"{country} GDP growth 2025 construction sector"
            results = self.search_web(query, 2)
            
            self.data['macroEconomic'].append({
                'country': country,
                'gdp': 'Verificar fonte',
                'inflation': 'Verificar fonte',
                'construction': 'Verificar fonte',
                'investment': 'Verificar fonte',
                'trend': 'neutral',
                'source': results[0].get('link', '') if results else ''
            })
            
            time.sleep(1)
    
    def _extract_country(self, text):
        """Extrai nome do país do texto"""
        countries = {
            'brasil': 'Brasil',
            'mexico': 'México',
            'chile': 'Chile',
            'colombia': 'Colômbia',
            'argentina': 'Argentina',
            'peru': 'Peru'
        }
        
        text_lower = text.lower()
        for key, value in countries.items():
            if key in text_lower:
                return value
        return 'América Latina'
    
    def save_data(self):
        """Salva dados coletados em JSON"""
        output_dir = 'data'
        os.makedirs(output_dir, exist_ok=True)
        
        output_file = f'{output_dir}/market_data.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Dados salvos em {output_file}")
        print(f"📊 Total de itens coletados:")
        print(f"   - Regulamentações: {len(self.data['regulations'])}")
        print(f"   - Movimentos competitivos: {len(self.data['competitorMoves'])}")
        print(f"   - Projetos: {len(self.data['majorProjects'])}")
        print(f"   - Movimentações de pessoas: {len(self.data['peopleMovements'])}")
        print(f"   - Dados macroeconômicos: {len(self.data['macroEconomic'])}")
    
    def run(self):
        """Executa todas as coletas"""
        print("🚀 Iniciando coleta de dados...")
        print(f"⏰ Timestamp: {datetime.now().isoformat()}")
        print()
        
        try:
            self.collect_regulations()
            self.collect_competitor_moves()
            self.collect_projects()
            self.scrape_linkedin_jobs()
            self.collect_macro_data()
            self.save_data()
            
            print("\n✅ Coleta concluída com sucesso!")
            
        except Exception as e:
            print(f"\n❌ Erro durante a coleta: {e}")
            raise


if __name__ == '__main__':
    collector = DataCollector()
    collector.run()
