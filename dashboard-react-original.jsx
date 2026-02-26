import React, { useState, useEffect } from 'react';
import { Share2, RefreshCw, TrendingUp, TrendingDown, FileText, Users, Zap, Building, Globe, Mail, MessageCircle, Calendar, AlertCircle } from 'lucide-react';

const KiddeMarketIntelligence = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString('pt-BR'));
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('all');

  // Dados simulados do mercado (em implementação real, viriam de APIs)
  const marketData = {
    mekkoData: {
      'Brasil': { total: 42, competitors: { 'Honeywell': 15, 'Intelbras': 12, 'Bosch': 8, 'Tyco': 4, 'Kidde': 3 } },
      'México': { total: 22, competitors: { 'Honeywell': 9, 'Tyco': 6, 'Bosch': 4, 'Kidde': 2, 'Hochiki': 1 } },
      'Colômbia': { total: 12, competitors: { 'Honeywell': 5, 'Bosch': 3, 'Intelbras': 2, 'Kidde': 2 } },
      'Chile': { total: 10, competitors: { 'Bosch': 4, 'Honeywell': 3, 'Tyco': 2, 'Kidde': 1 } },
      'Argentina': { total: 8, competitors: { 'Honeywell': 3, 'Bosch': 2, 'Intelbras': 2, 'Kidde': 1 } },
      'Peru': { total: 6, competitors: { 'Honeywell': 2, 'Bosch': 2, 'Tyco': 1, 'Kidde': 1 } },
      'Outros': { total: 10, competitors: { 'Honeywell': 4, 'Bosch': 3, 'Tyco': 2, 'Kidde': 1 } }
    },
    regulations: [
      { date: '2025-02-20', country: 'Brasil', title: 'ABNT NBR 17240:2025 - Nova revisão', impact: 'Alto', description: 'Atualização das normas de sistemas de detecção e alarme de incêndio com requisitos mais rigorosos de integração IoT' },
      { date: '2025-02-15', country: 'México', title: 'NOM-002-STPS-2025', impact: 'Médio', description: 'Condições de segurança - prevenção e proteção contra incêndios nos centros de trabalho' },
      { date: '2025-02-10', country: 'Chile', title: 'Decreto Supremo 369/2025', impact: 'Alto', description: 'Obrigatoriedade de sistemas addressable em edifícios comerciais acima de 5 andares' },
      { date: '2025-01-28', country: 'Colômbia', title: 'Resolución 1409/2025', impact: 'Médio', description: 'Estabelece padrões mínimos de sistemas de detecção em hospitais e clínicas' }
    ],
    macroEconomic: [
      { country: 'Brasil', gdp: '+2.8%', inflation: '4.2%', construction: '+5.1%', investment: 'Crescente', trend: 'up' },
      { country: 'México', gdp: '+3.2%', inflation: '3.8%', construction: '+4.2%', investment: 'Estável', trend: 'up' },
      { country: 'Chile', gdp: '+1.9%', inflation: '3.1%', construction: '+2.8%', investment: 'Moderado', trend: 'neutral' },
      { country: 'Colômbia', gdp: '+2.1%', inflation: '5.8%', construction: '+3.5%', investment: 'Crescente', trend: 'up' },
      { country: 'Argentina', gdp: '-0.5%', inflation: '8.9%', construction: '-1.2%', investment: 'Contraído', trend: 'down' }
    ],
    competitorMoves: [
      { date: '2025-02-22', company: 'Honeywell', action: 'Lançamento de produto', detail: 'Nova linha NOTIFIER ONYX NFS2-640 com IA integrada para América Latina', impact: 'Alto' },
      { date: '2025-02-18', company: 'Intelbras', action: 'Expansão regional', detail: 'Abertura de centro de distribuição em Bogotá, Colômbia', impact: 'Médio' },
      { date: '2025-02-15', company: 'Bosch', action: 'Parceria estratégica', detail: 'Joint venture com integradores mexicanos para projetos governamentais', impact: 'Alto' },
      { date: '2025-02-10', company: 'Tyco', action: 'Aquisição', detail: 'Compra de distribuidora regional no Peru - expandindo presença andina', impact: 'Médio' },
      { date: '2025-02-05', company: 'Hochiki', action: 'Certificação', detail: 'Produtos aprovados pela ABNT para mercado brasileiro', impact: 'Médio' },
      { date: '2025-01-30', company: 'Siemens', action: 'Inovação', detail: 'Lançamento de sistema wireless Cerberus PRO para retrofit', impact: 'Alto' }
    ],
    newProducts: [
      { company: 'Honeywell', product: 'NOTIFIER ONYX NFS2-640', features: 'IA para detecção preditiva, 640 pontos endereçáveis, integração cloud', availability: 'Mar/2025' },
      { company: 'Bosch', product: 'FPA-5000 v2.0', features: 'Análise comportamental de fumaça, redundância dupla, app mobile', availability: 'Abr/2025' },
      { company: 'Siemens', product: 'Cerberus PRO Wireless', features: 'Sistema 100% wireless, retrofit sem obras, bateria 10 anos', availability: 'Mai/2025' },
      { company: 'Intelbras', product: 'AMT 8000 Smart', features: 'Central addressable nacional, custo reduzido, integração com CFTV', availability: 'Jun/2025' }
    ],
    majorProjects: [
      { 
        project: 'Linha 6 do Metrô de São Paulo', 
        country: 'Brasil', 
        value: 'R$ 45M', 
        winner: 'Honeywell', 
        status: 'Em andamento',
        contacts: 'João Silva (Metro SP) - joao.silva@metrosp.com.br',
        scope: '15 estações, sistema addressable completo'
      },
      { 
        project: 'Hospital General de México', 
        country: 'México', 
        value: '$8M USD', 
        winner: 'Bosch', 
        status: 'Licitação',
        contacts: 'Ana García (Comisión Federal) - agarcia@cfemx.gob.mx',
        scope: 'Retrofit completo, 850 dispositivos'
      },
      { 
        project: 'Shopping Parque Arauco Expansion', 
        country: 'Chile', 
        value: '$3.2M USD', 
        winner: 'Tyco', 
        status: 'Adjudicado',
        contacts: 'Carlos Mendez (Parque Arauco) - cmendez@parauco.cl',
        scope: 'Expansão de 25.000m², integração BMS'
      },
      { 
        project: 'Data Center Equinix BO2', 
        country: 'Colômbia', 
        value: '$5.5M USD', 
        winner: 'Siemens', 
        status: 'Em construção',
        contacts: 'Laura Rodríguez (Equinix) - lrodriguez@equinix.com',
        scope: 'Tier III, dupla detecção VESDA'
      }
    ],
    experts: [
      { name: 'Carlos Hernández', role: 'VP América Latina - Honeywell', email: 'carlos.hernandez@honeywell.com', linkedin: 'linkedin.com/in/carloshernandez', specialty: 'Estratégia regional' },
      { name: 'Mariana Santos', role: 'Diretora Comercial - Intelbras', email: 'mariana.santos@intelbras.com.br', linkedin: 'linkedin.com/in/marianasantos', specialty: 'Mercado brasileiro' },
      { name: 'Roberto Fernández', role: 'Head of Sales LATAM - Bosch', email: 'roberto.fernandez@bosch.com', linkedin: 'linkedin.com/in/robertofernandez', specialty: 'Grandes projetos' },
      { name: 'Diana Torres', role: 'Regional Manager - Tyco', email: 'diana.torres@tyco.com', linkedin: 'linkedin.com/in/dianatorres', specialty: 'Mercado andino' }
    ],
    peopleMovements: [
      { date: '2025-02-15', person: 'Ricardo Almeida', from: 'Bosch (Gerente Regional)', to: 'Honeywell (Diretor Comercial)', impact: 'Contatos e estratégias de grandes contas migram' },
      { date: '2025-02-01', person: 'Patricia Ramos', from: 'Hochiki (Engenheira Sênior)', to: 'Intelbras (Gerente de Produto)', impact: 'Expertise em tecnologia analógica addressable' },
      { date: '2025-01-20', person: 'Miguel Ángel Castro', from: 'Siemens (VP México)', to: 'Tyco (VP LATAM)', impact: 'Expansão agressiva esperada no México' }
    ]
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    // Simula atualização de dados
    setTimeout(() => {
      setLastUpdate(new Date().toLocaleString('pt-BR'));
      setIsUpdating(false);
    }, 2000);
  };

  const handleShare = (method) => {
    const shareText = `Dashboard Kidde Market Intelligence - Última atualização: ${lastUpdate}`;
    if (method === 'email') {
      window.open(`mailto:?subject=Kidde Market Intelligence&body=${encodeURIComponent(shareText)}`);
    } else if (method === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
    }
  };

  const MekkoChart = () => {
    const countries = Object.keys(marketData.mekkoData);
    const totalMarket = countries.reduce((sum, country) => sum + marketData.mekkoData[country].total, 0);
    const colors = {
      'Honeywell': '#FF6B35',
      'Intelbras': '#004E89',
      'Bosch': '#1A936F',
      'Tyco': '#C73E1D',
      'Kidde': '#6A4C93',
      'Hochiki': '#F77F00',
      'Siemens': '#06A77D',
      'Others': '#95A3B3'
    };

    return (
      <div className="mekko-container">
        <div className="mekko-chart">
          {countries.map((country) => {
            const countryData = marketData.mekkoData[country];
            const widthPercent = (countryData.total / totalMarket) * 100;
            const competitors = countryData.competitors;
            const sortedCompetitors = Object.entries(competitors).sort((a, b) => b[1] - a[1]);
            
            return (
              <div key={country} className="mekko-column" style={{ width: `${widthPercent}%` }}>
                <div className="mekko-country-label">{country}</div>
                <div className="mekko-bars">
                  {sortedCompetitors.map(([competitor, value]) => {
                    const heightPercent = (value / countryData.total) * 100;
                    return (
                      <div
                        key={competitor}
                        className="mekko-bar"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: colors[competitor] || colors.Others
                        }}
                        title={`${competitor}: ${value}% (${country})`}
                      >
                        {heightPercent > 10 && (
                          <span className="mekko-label">{competitor} {value}%</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mekko-total">${countryData.total}M</div>
              </div>
            );
          })}
        </div>
        <div className="mekko-legend">
          {Object.entries(colors).map(([company, color]) => (
            <div key={company} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: color }}></div>
              <span>{company}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
          color: #e8eaf2;
          font-family: 'IBM Plex Sans', sans-serif;
          padding: 2rem;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .header {
          background: linear-gradient(135deg, #1e2749 0%, #2d3561 100%);
          border-radius: 24px;
          padding: 3rem;
          margin-bottom: 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at top right, rgba(106, 76, 147, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .logo-section h1 {
          font-family: 'Archivo', sans-serif;
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #fff 0%, #a8b2d1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .logo-section p {
          font-size: 1.1rem;
          color: #8892b0;
          font-weight: 300;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          border: none;
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6a4c93 0%, #8b5cf6 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(106, 76, 147, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #e8eaf2;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .update-info {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1rem 1.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          font-size: 0.9rem;
        }

        .update-info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .updating {
          background: #f59e0b;
        }

        .executive-summary {
          background: linear-gradient(135deg, #2d3561 0%, #1e2749 100%);
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .executive-summary h2 {
          font-family: 'Archivo', sans-serif;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #fff;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .summary-card {
          background: rgba(0, 0, 0, 0.2);
          padding: 1.5rem;
          border-radius: 12px;
          border-left: 4px solid;
        }

        .summary-card.positive { border-left-color: #10b981; }
        .summary-card.negative { border-left-color: #ef4444; }
        .summary-card.neutral { border-left-color: #f59e0b; }

        .summary-card h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8892b0;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .summary-card p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #e8eaf2;
        }

        .section {
          background: linear-gradient(135deg, #1e2749 0%, #2d3561 100%);
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .section-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #6a4c93 0%, #8b5cf6 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-header h2 {
          font-family: 'Archivo', sans-serif;
          font-size: 1.8rem;
          color: #fff;
          flex: 1;
        }

        .card {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .card:hover {
          background: rgba(0, 0, 0, 0.3);
          border-color: rgba(106, 76, 147, 0.3);
          transform: translateX(4px);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .card-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #8892b0;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badge-high {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }

        .badge-medium {
          background: rgba(245, 158, 11, 0.2);
          color: #fcd34d;
        }

        .badge-low {
          background: rgba(16, 185, 129, 0.2);
          color: #6ee7b7;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }

        .table th {
          text-align: left;
          padding: 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8892b0;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #e8eaf2;
        }

        .table tr:hover {
          background: rgba(0, 0, 0, 0.2);
        }

        .trend-up {
          color: #10b981;
        }

        .trend-down {
          color: #ef4444;
        }

        .trend-neutral {
          color: #f59e0b;
        }

        .mekko-container {
          margin-top: 2rem;
        }

        .mekko-chart {
          display: flex;
          height: 400px;
          gap: 2px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .mekko-column {
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .mekko-country-label {
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #8892b0;
          margin-bottom: 0.5rem;
        }

        .mekko-bars {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-radius: 8px;
          overflow: hidden;
        }

        .mekko-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
        }

        .mekko-bar:hover {
          opacity: 0.8;
          transform: scale(1.02);
        }

        .mekko-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .mekko-total {
          text-align: center;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #fff;
        }

        .mekko-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        .contact-link {
          color: #8b5cf6;
          text-decoration: none;
          transition: color 0.2s;
        }

        .contact-link:hover {
          color: #a78bfa;
        }

        .share-menu {
          position: relative;
          display: inline-block;
        }

        .share-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: #2d3561;
          border-radius: 12px;
          padding: 0.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
          min-width: 180px;
        }

        .share-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          color: #e8eaf2;
        }

        .share-option:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 1rem;
          }
          
          .header {
            padding: 2rem;
          }
          
          .logo-section h1 {
            font-size: 2rem;
          }
          
          .header-top {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .summary-grid {
            grid-template-columns: 1fr;
          }
          
          .mekko-chart {
            height: 300px;
          }
        }

        .rotating {
          animation: rotate 1s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="header">
        <div className="header-content">
          <div className="header-top">
            <div className="logo-section">
              <h1>Kidde Market Intelligence</h1>
              <p>Detecção e Alarme de Incêndio • América Latina</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-primary" onClick={handleUpdate} disabled={isUpdating}>
                <RefreshCw size={18} className={isUpdating ? 'rotating' : ''} />
                {isUpdating ? 'Atualizando...' : 'Atualizar Dados'}
              </button>
              <div className="share-menu">
                <button className="btn btn-secondary" onClick={() => document.getElementById('shareDropdown').classList.toggle('share-dropdown')}>
                  <Share2 size={18} />
                  Compartilhar
                </button>
                <div id="shareDropdown" style={{ display: 'none' }}>
                  <div className="share-option" onClick={() => handleShare('email')}>
                    <Mail size={16} />
                    E-mail
                  </div>
                  <div className="share-option" onClick={() => handleShare('whatsapp')}>
                    <MessageCircle size={16} />
                    WhatsApp
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="update-info">
            <div className="update-info-item">
              <div className={`status-indicator ${isUpdating ? 'updating' : ''}`}></div>
              <span>Status: {isUpdating ? 'Atualizando...' : 'Online'}</span>
            </div>
            <div className="update-info-item">
              <Calendar size={16} />
              <span>Última atualização: {lastUpdate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="executive-summary">
        <h2>📊 Sumário Executivo</h2>
        <div className="summary-grid">
          <div className="summary-card positive">
            <h3>Oportunidade Principal</h3>
            <p>Chile obriga sistemas addressable em edifícios comerciais - mercado de $12M com apenas 10% de penetração Kidde</p>
          </div>
          <div className="summary-card negative">
            <h3>Ameaça Crítica</h3>
            <p>Honeywell lança ONYX com IA no Brasil (15/Mar) - pode capturar 20% do segmento premium em 6 meses</p>
          </div>
          <div className="summary-card neutral">
            <h3>Movimento Competitivo</h3>
            <p>Intelbras abre hub em Bogotá - ameaça pricing no mercado andino. Tyco adquire distribuidor no Peru</p>
          </div>
          <div className="summary-card positive">
            <h3>Gap de Mercado</h3>
            <p>Sistemas wireless para retrofit crescendo 35% a.a. - Siemens domina mas Kidde pode entrar com solução certificada</p>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <FileText size={24} color="#fff" />
          </div>
          <h2>Regulamentação e Normas</h2>
        </div>
        {marketData.regulations.map((reg, idx) => (
          <div key={idx} className="card">
            <div className="card-header">
              <div>
                <div className="card-title">{reg.title}</div>
                <div className="card-meta">
                  <span>🌎 {reg.country}</span>
                  <span>📅 {reg.date}</span>
                </div>
              </div>
              <span className={`badge badge-${reg.impact === 'Alto' ? 'high' : reg.impact === 'Médio' ? 'medium' : 'low'}`}>
                {reg.impact}
              </span>
            </div>
            <p>{reg.description}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <Globe size={24} color="#fff" />
          </div>
          <h2>Cenário Macroeconômico</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>País</th>
              <th>PIB</th>
              <th>Inflação</th>
              <th>Construção</th>
              <th>Investimento</th>
              <th>Tendência</th>
            </tr>
          </thead>
          <tbody>
            {marketData.macroEconomic.map((eco, idx) => (
              <tr key={idx}>
                <td><strong>{eco.country}</strong></td>
                <td className={eco.gdp.includes('-') ? 'trend-down' : 'trend-up'}>{eco.gdp}</td>
                <td>{eco.inflation}</td>
                <td className={eco.construction.includes('-') ? 'trend-down' : 'trend-up'}>{eco.construction}</td>
                <td>{eco.investment}</td>
                <td>
                  {eco.trend === 'up' && <TrendingUp size={20} className="trend-up" />}
                  {eco.trend === 'down' && <TrendingDown size={20} className="trend-down" />}
                  {eco.trend === 'neutral' && <span className="trend-neutral">→</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <TrendingUp size={24} color="#fff" />
          </div>
          <h2>Mekko Map - Participação de Mercado</h2>
        </div>
        <p style={{ marginBottom: '1rem', color: '#8892b0' }}>
          Mercado total LATAM de Detecção & Alarme: <strong style={{ color: '#fff' }}>$110M USD</strong> • 
          Participação Kidde: <strong style={{ color: '#6a4c93' }}>10% ($11M)</strong>
        </p>
        <MekkoChart />
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <AlertCircle size={24} color="#fff" />
          </div>
          <h2>Movimentações da Concorrência</h2>
        </div>
        {marketData.competitorMoves.map((move, idx) => (
          <div key={idx} className="card">
            <div className="card-header">
              <div>
                <div className="card-title">{move.company} • {move.action}</div>
                <div className="card-meta">
                  <span>📅 {move.date}</span>
                </div>
              </div>
              <span className={`badge badge-${move.impact === 'Alto' ? 'high' : 'medium'}`}>
                {move.impact}
              </span>
            </div>
            <p>{move.detail}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <Zap size={24} color="#fff" />
          </div>
          <h2>Novos Produtos e Tecnologias</h2>
        </div>
        {marketData.newProducts.map((product, idx) => (
          <div key={idx} className="card">
            <div className="card-header">
              <div>
                <div className="card-title">{product.company} - {product.product}</div>
                <div className="card-meta">
                  <span>🚀 Disponível: {product.availability}</span>
                </div>
              </div>
            </div>
            <p><strong>Features:</strong> {product.features}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <Building size={24} color="#fff" />
          </div>
          <h2>Grandes Projetos América Latina</h2>
        </div>
        {marketData.majorProjects.map((project, idx) => (
          <div key={idx} className="card">
            <div className="card-header">
              <div>
                <div className="card-title">{project.project}</div>
                <div className="card-meta">
                  <span>🌎 {project.country}</span>
                  <span>💰 {project.value}</span>
                  <span>🏆 {project.winner}</span>
                </div>
              </div>
              <span className="badge badge-medium">{project.status}</span>
            </div>
            <p><strong>Escopo:</strong> {project.scope}</p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>Contato:</strong> <a href={`mailto:${project.contacts.split(' - ')[1]}`} className="contact-link">{project.contacts}</a>
            </p>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <Users size={24} color="#fff" />
          </div>
          <h2>Movimentação de Pessoas</h2>
        </div>
        {marketData.peopleMovements.map((movement, idx) => (
          <div key={idx} className="card">
            <div className="card-header">
              <div>
                <div className="card-title">{movement.person}</div>
                <div className="card-meta">
                  <span>📅 {movement.date}</span>
                </div>
              </div>
            </div>
            <p><strong>{movement.from}</strong> → <strong>{movement.to}</strong></p>
            <p style={{ marginTop: '0.5rem', color: '#f59e0b' }}>
              <strong>Impacto:</strong> {movement.impact}
            </p>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-icon">
            <Users size={24} color="#fff" />
          </div>
          <h2>Experts do Mercado de Incêndio</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Especialidade</th>
              <th>Contato</th>
            </tr>
          </thead>
          <tbody>
            {marketData.experts.map((expert, idx) => (
              <tr key={idx}>
                <td><strong>{expert.name}</strong></td>
                <td>{expert.role}</td>
                <td>{expert.specialty}</td>
                <td>
                  <a href={`mailto:${expert.email}`} className="contact-link">{expert.email}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'center', padding: '2rem', color: '#8892b0', fontSize: '0.9rem' }}>
        <p>Dashboard desenvolvido para Kidde • Dados simulados para demonstração</p>
        <p style={{ marginTop: '0.5rem' }}>Para implementação real com dados ao vivo, requer integração com APIs de consultorias e bases de dados comerciais</p>
      </div>
    </div>
  );
};

export default KiddeMarketIntelligence;
