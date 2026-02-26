#!/usr/bin/env python3
"""
Script para testar localmente antes de fazer push
"""

import os
import sys

def check_dependencies():
    """Verifica se todas as dependências estão instaladas"""
    print("🔍 Verificando dependências...")
    
    required_modules = [
        'requests',
        'bs4',
        'pandas',
        'anthropic'
    ]
    
    missing = []
    for module in required_modules:
        try:
            __import__(module)
        except ImportError:
            missing.append(module)
    
    if missing:
        print(f"❌ Módulos faltando: {', '.join(missing)}")
        print("Execute: pip install -r requirements.txt")
        return False
    
    print("✅ Todas as dependências OK")
    return True

def check_env_vars():
    """Verifica se as variáveis de ambiente estão configuradas"""
    print("\n🔑 Verificando API Keys...")
    
    required_vars = {
        'SERPER_API_KEY': 'Serper.dev (busca web)',
        'NEWS_API_KEY': 'NewsAPI (notícias)',
        'ANTHROPIC_API_KEY': 'Claude API (opcional)'
    }
    
    missing = []
    for var, description in required_vars.items():
        if not os.getenv(var):
            missing.append(f"{var} ({description})")
    
    if missing:
        print("⚠️  API Keys não configuradas:")
        for item in missing:
            print(f"   - {item}")
        print("\nPara testar localmente, configure as variáveis de ambiente:")
        print("export SERPER_API_KEY='sua_chave'")
        print("export NEWS_API_KEY='sua_chave'")
        print("export ANTHROPIC_API_KEY='sua_chave'")
        return False
    
    print("✅ Todas as API Keys configuradas")
    return True

def test_data_collection():
    """Testa a coleta de dados"""
    print("\n📊 Testando coleta de dados...")
    
    try:
        # Importa o collector
        sys.path.insert(0, 'scripts')
        from collect_data import DataCollector
        
        collector = DataCollector()
        
        # Testa uma busca simples
        results = collector.search_web("fire detection systems", 2)
        if results:
            print(f"✅ Busca web funcionando ({len(results)} resultados)")
        else:
            print("⚠️  Busca web retornou 0 resultados")
        
        # Testa notícias
        news = collector.get_news("fire alarm systems", 7)
        if news:
            print(f"✅ API de notícias funcionando ({len(news)} artigos)")
        else:
            print("⚠️  API de notícias retornou 0 resultados")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro ao testar coleta: {e}")
        return False

def test_dashboard_generation():
    """Testa a geração do dashboard"""
    print("\n🎨 Testando geração do dashboard...")
    
    try:
        sys.path.insert(0, 'scripts')
        from generate_dashboard import load_data, generate_html
        
        # Carrega dados de exemplo
        data = load_data()
        
        # Gera HTML
        html = generate_html(data)
        
        if len(html) > 1000:
            print("✅ Dashboard HTML gerado com sucesso")
            print(f"   Tamanho: {len(html)} caracteres")
            return True
        else:
            print("⚠️  Dashboard gerado mas muito pequeno")
            return False
            
    except Exception as e:
        print(f"❌ Erro ao testar dashboard: {e}")
        return False

def main():
    """Executa todos os testes"""
    print("=" * 60)
    print("🧪 TESTE LOCAL DO DASHBOARD KIDDE")
    print("=" * 60)
    
    all_ok = True
    
    # Testa dependências
    if not check_dependencies():
        all_ok = False
    
    # Testa env vars
    if not check_env_vars():
        all_ok = False
        print("\n⚠️  Continuando com dados de exemplo...")
    
    # Testa coleta de dados (se env vars OK)
    if os.getenv('SERPER_API_KEY'):
        if not test_data_collection():
            all_ok = False
    
    # Testa geração do dashboard
    if not test_dashboard_generation():
        all_ok = False
    
    print("\n" + "=" * 60)
    if all_ok:
        print("✅ TODOS OS TESTES PASSARAM!")
        print("=" * 60)
        print("\n🚀 Próximos passos:")
        print("1. Faça commit das mudanças")
        print("2. Push para o GitHub")
        print("3. O GitHub Actions cuidará do resto!")
    else:
        print("⚠️  ALGUNS TESTES FALHARAM")
        print("=" * 60)
        print("\nResolva os problemas acima antes de fazer push")
    
    return all_ok

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
