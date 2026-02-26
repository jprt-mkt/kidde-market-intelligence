#!/usr/bin/env python3
"""
Gera dashboard HTML estático com dados coletados
"""

import json
import os
from datetime import datetime

def load_data():
    """Carrega dados coletados"""
    try:
        with open('data/market_data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("⚠️  Arquivo de dados não encontrado, usando dados padrão")
        return {
            'lastUpdate': datetime.now().isoformat(),
            'regulations': [],
            'macroEconomic': [],
            'competitorMoves': [],
            'newProducts': [],
            'majorProjects': [],
            'peopleMovements': [],
            'experts': []
        }

def generate_html(data):
    """Gera HTML completo do dashboard"""
    
    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kidde Market Intelligence Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
            color: #e8eaf2;
            font-family: 'IBM Plex Sans', sans-serif;
            padding: 2rem;
        }}

        .header {{
            background: linear-gradient(135deg, #1e2749 0%, #2d3561 100%);
            border-radius: 24px;
            padding: 3rem;
            margin-bottom: 2rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }}

        h1 {{
            font-family: 'Archivo', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #fff 0%, #a8b2d1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
        }}

        .update-info {{
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 1.5rem;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            font-size: 0.9rem;
        }}

        .status-dot {{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            animation: pulse 2s infinite;
        }}

        @keyframes pulse {{
            0%, 100% {{ opacity: 1; }}
            50% {{ opacity: 0.5; }}
        }}

        .section {{
            background: linear-gradient(135deg, #1e2749 0%, #2d3561 100%);
            border-radius: 20px;
            padding: 2.5rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }}

        .section h2 {{
            font-family: 'Archivo', sans-serif;
            font-size: 1.8rem;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }}

        .card {{
            background: rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
        }}

        .card:hover {{
            background: rgba(0, 0, 0, 0.3);
            border-color: rgba(106, 76, 147, 0.3);
            transform: translateX(4px);
        }}

        .card-title {{
            font-size: 1.1rem;
            font-weight: 600;
            color: #fff;
            margin-bottom: 0.5rem;
        }}

        .card-meta {{
            display: flex;
            gap: 1rem;
            font-size: 0.85rem;
            color: #8892b0;
            margin-bottom: 1rem;
        }}

        .badge {{
            display: inline-block;
            padding: 0.35rem 0.75rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }}

        .badge-high {{
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
        }}

        .badge-medium {{
            background: rgba(245, 158, 11, 0.2);
            color: #fcd34d;
        }}

        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }}

        a {{
            color: #8b5cf6;
            text-decoration: none;
        }}

        a:hover {{
            color: #a78bfa;
        }}

        @media (max-width: 768px) {{
            body {{ padding: 1rem; }}
            h1 {{ font-size: 2rem; }}
            .header {{ padding: 2rem; }}
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🔥 Kidde Market Intelligence</h1>
        <p style="font-size: 1.1rem; color: #8892b0;">Detecção e Alarme de Incêndio • América Latina</p>
        <div class="update-info">
            <div class="status-dot"></div>
            <span>Última atualização: {datetime.fromisoformat(data['lastUpdate']).strftime('%d/%m/%Y %H:%M')}</span>
            <span>•</span>
            <span>Próxima atualização: automática em 24h</span>
        </div>
    </div>

    <div class="section">
        <h2>📋 Regulamentação e Normas</h2>
        <div class="grid">
"""
    
    # Adiciona regulamentações
    for reg in data.get('regulations', [])[:8]:
        html += f"""
            <div class="card">
                <div class="card-title">{reg.get('title', 'N/A')}</div>
                <div class="card-meta">
                    <span>🌎 {reg.get('country', 'N/A')}</span>
                    <span>📅 {reg.get('date', 'N/A')}</span>
                </div>
                <span class="badge badge-{reg.get('impact', 'medium').lower()}">{reg.get('impact', 'N/A')}</span>
                <p style="margin-top: 1rem;">{reg.get('description', 'N/A')[:200]}...</p>
                {f'<a href="{reg.get("source", "#")}" target="_blank">Ver fonte →</a>' if reg.get('source') else ''}
            </div>
"""
    
    html += """
        </div>
    </div>

    <div class="section">
        <h2>🏢 Movimentações da Concorrência</h2>
"""
    
    # Adiciona movimentos dos concorrentes
    for move in data.get('competitorMoves', [])[:10]:
        html += f"""
        <div class="card">
            <div class="card-title">{move.get('company', 'N/A')} • {move.get('action', 'N/A')}</div>
            <div class="card-meta">
                <span>📅 {move.get('date', 'N/A')}</span>
            </div>
            <span class="badge badge-{move.get('impact', 'medium').lower()}">{move.get('impact', 'N/A')}</span>
            <p style="margin-top: 1rem;">{move.get('detail', 'N/A')}</p>
            {f'<a href="{move.get("source", "#")}" target="_blank">Ver fonte →</a>' if move.get('source') else ''}
        </div>
"""
    
    html += """
    </div>

    <div class="section">
        <h2>🏗️ Grandes Projetos América Latina</h2>
"""
    
    # Adiciona projetos
    for project in data.get('majorProjects', [])[:8]:
        html += f"""
        <div class="card">
            <div class="card-title">{project.get('project', 'N/A')}</div>
            <div class="card-meta">
                <span>🌎 {project.get('country', 'N/A')}</span>
                <span>💰 {project.get('value', 'N/A')}</span>
                <span>🏆 {project.get('winner', 'N/A')}</span>
            </div>
            <span class="badge badge-medium">{project.get('status', 'N/A')}</span>
            <p style="margin-top: 1rem;"><strong>Escopo:</strong> {project.get('scope', 'N/A')[:200]}...</p>
            {f'<a href="{project.get("source", "#")}" target="_blank">Ver fonte →</a>' if project.get('source') else ''}
        </div>
"""
    
    html += """
    </div>

    <div class="section">
        <h2>👥 Movimentação de Pessoas</h2>
"""
    
    # Adiciona movimentações de pessoas
    for movement in data.get('peopleMovements', [])[:6]:
        html += f"""
        <div class="card">
            <div class="card-title">{movement.get('person', 'N/A')}</div>
            <div class="card-meta">
                <span>📅 {movement.get('date', 'N/A')}</span>
            </div>
            <p><strong>{movement.get('from', 'N/A')}</strong> → <strong>{movement.get('to', 'N/A')}</strong></p>
            <p style="margin-top: 0.5rem; color: #f59e0b;"><strong>Impacto:</strong> {movement.get('impact', 'N/A')[:150]}...</p>
        </div>
"""
    
    html += f"""
    </div>

    <div style="text-align: center; padding: 2rem; color: #8892b0; font-size: 0.9rem;">
        <p>🤖 Dashboard atualizado automaticamente via GitHub Actions</p>
        <p style="margin-top: 0.5rem;">Próxima atualização: {(datetime.now().replace(hour=6, minute=0, second=0) + timedelta(days=1)).strftime('%d/%m/%Y às %H:%M UTC')}</p>
        <p style="margin-top: 1rem;"><a href="https://github.com/seu-usuario/kidde-dashboard" target="_blank">⭐ Ver no GitHub</a></p>
    </div>

    <script>
        // Auto-refresh após 24 horas
        setTimeout(() => {{
            location.reload();
        }}, 24 * 60 * 60 * 1000);
    </script>
</body>
</html>
"""
    
    return html

def main():
    """Função principal"""
    print("🎨 Gerando dashboard HTML...")
    
    # Carrega dados
    data = load_data()
    
    # Gera HTML
    html = generate_html(data)
    
    # Salva arquivo
    os.makedirs('public', exist_ok=True)
    output_file = 'public/index.html'
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"✅ Dashboard gerado: {output_file}")
    print(f"📊 Dados incluídos:")
    print(f"   - Regulamentações: {len(data.get('regulations', []))}")
    print(f"   - Movimentos competitivos: {len(data.get('competitorMoves', []))}")
    print(f"   - Projetos: {len(data.get('majorProjects', []))}")
    print(f"   - Movimentações de pessoas: {len(data.get('peopleMovements', []))}")

if __name__ == '__main__':
    from datetime import timedelta
    main()
