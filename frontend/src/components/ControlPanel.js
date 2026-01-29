import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

// Componente de Tooltip Informativo
function InfoTooltip({ text }) {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block ml-2">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-help"
      >
        <Info size={16} className="text-white/50 hover:text-white/80 transition-colors" />
      </div>
      
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-6 top-0 w-64 p-3 rounded-lg backdrop-blur-xl border z-50 pointer-events-none"
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
            }}
          >
            <p className="text-xs text-white/90 leading-relaxed">
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ControlPanel({ biomes, onUpdate, customBiomes, onAddCustomBiome, onRemoveCustomBiome }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBiome, setSelectedBiome] = useState(0);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customForm, setCustomForm] = useState({
    name: '',
    link: '',
    color: '#22d3ee',
    positionX: 0.5,
    positionY: 0.5
  });

  const handleChange = (biomeName, property, value) => {
    onUpdate(biomeName, property, parseFloat(value));
  };
  
  const handleTextChange = (biomeName, property, value) => {
    onUpdate(biomeName, property, value);
  };

  const handleAddCustom = () => {
    if (customForm.name && customForm.link) {
      onAddCustomBiome({
        name: customForm.name,
        color: customForm.color,
        accentColor: customForm.color,
        position: { x: customForm.positionX, y: customForm.positionY },
        link: customForm.link,
        regionRadius: 0.15,
        movementPattern: 'orbital',
        movementSpeed: 0.001,
        chaos: 0.5,
        weight: 0.5,
        isCustom: true
      });
      setCustomForm({
        name: '',
        link: '',
        color: '#22d3ee',
        positionX: 0.5,
        positionY: 0.5
      });
      setShowCustomForm(false);
    }
  };

  const currentBiome = biomes[selectedBiome];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg backdrop-blur-md border transition-all duration-300"
        style={{
          background: 'rgba(2, 6, 23, 0.9)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
        data-testid="control-panel-toggle"
      >
        <span className="text-white text-sm font-medium">
          {isOpen ? '✕ Fechar Controles' : '⚙️ Controles'}
        </span>
      </button>

      {/* Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 h-screen w-96 z-40 overflow-y-auto"
            style={{
              background: 'rgba(2, 6, 23, 0.95)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Painel de Controle
              </h2>

              {/* Biome Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Selecionar Bioma
                </label>
                <select
                  value={selectedBiome}
                  onChange={(e) => setSelectedBiome(parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg backdrop-blur-md border"
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                  data-testid="biome-selector"
                >
                  {biomes.map((biome, index) => (
                    <option key={index} value={index}>
                      {biome.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Biome Display */}
              <div 
                className="mb-6 p-4 rounded-lg"
                style={{
                  background: `${currentBiome.color}20`,
                  border: `2px solid ${currentBiome.color}40`
                }}
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {currentBiome.name}
                </h3>
                <div className="text-xs text-white/60 mb-2">
                  Padrão: {currentBiome.movementPattern}
                </div>
                
                {/* Link Input */}
                <div className="mt-3">
                  <label className="block text-xs font-medium text-white/70 mb-1 flex items-center">
                    <InfoTooltip text="URL que será aberta ao clicar rapidamente na caixa do bioma (sem arrastar). Links externos devem começar com https://" />
                    <span className="ml-2">Link (URL)</span>
                  </label>
                  <input
                    type="text"
                    value={currentBiome.link || ''}
                    onChange={(e) => handleTextChange(currentBiome.name, 'link', e.target.value)}
                    placeholder="https://exemplo.com"
                    className="w-full px-3 py-1.5 text-xs rounded backdrop-blur-md border"
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }}
                    data-testid={`${currentBiome.name}-link-input`}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-5">
                {/* Movement Pattern */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 flex items-center">
                    <InfoTooltip text="Define o tipo de movimento das partículas deste bioma. Spiral = movimento em espiral circular. Flow = fluxo rápido e turbulento. Orbital = órbitas circulares suaves. Pulse = pulsação que expande/contrai. Wave = movimento ondulatório fluido." />
                    <span className="ml-2">Padrão de Movimento</span>
                  </label>
                  <select
                    value={currentBiome.movementPattern}
                    onChange={(e) => handleTextChange(currentBiome.name, 'movementPattern', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg backdrop-blur-md border"
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }}
                    data-testid={`${currentBiome.name}-pattern`}
                  >
                    <option value="spiral">🌀 Spiral (Espiral)</option>
                    <option value="flow">💨 Flow (Fluxo)</option>
                    <option value="orbital">🔄 Orbital (Órbita)</option>
                    <option value="pulse">💓 Pulse (Pulsação)</option>
                    <option value="wave">🌊 Wave (Onda)</option>
                  </select>
                </div>

                {/* Movement Speed */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 flex items-center">
                    <InfoTooltip text="Controla a rapidez com que as partículas se movem. Valores maiores = movimento mais rápido e dinâmico. Valores menores = movimento mais lento e contemplativo." />
                    <span className="ml-2">Velocidade: {(currentBiome.movementSpeed * 1000).toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.0001"
                    max="0.005"
                    step="0.0001"
                    value={currentBiome.movementSpeed}
                    onChange={(e) => handleChange(currentBiome.name, 'movementSpeed', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-speed`}
                  />
                </div>

                {/* Chaos */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 flex items-center">
                    <InfoTooltip text="Define o nível de aleatoriedade e imprevisibilidade do movimento. 0% = movimento muito ordenado e previsível. 100% = movimento totalmente caótico e imprevisível. Valores altos criam padrões orgânicos." />
                    <span className="ml-2">Caos: {(currentBiome.chaos * 100).toFixed(0)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={currentBiome.chaos}
                    onChange={(e) => handleChange(currentBiome.name, 'chaos', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-chaos`}
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 flex items-center">
                    <InfoTooltip text="Determina quantas partículas orbitam este bioma. Valores maiores = mais partículas e maior presença visual. Exemplo: 2.5 = 2.5x mais partículas que o padrão. Afeta a distribuição proporcional entre todos os biomas." />
                    <span className="ml-2">Densidade (Weight): {currentBiome.weight.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={currentBiome.weight}
                    onChange={(e) => handleChange(currentBiome.name, 'weight', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-weight`}
                  />
                </div>

                {/* Region Radius */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2 flex items-center">
                    <InfoTooltip text="Define o tamanho da área de influência do bioma. Valores maiores = partículas se espalham mais longe do centro. Valores menores = partículas ficam mais concentradas e próximas. Afeta o padrão visual de dispersão." />
                    <span className="ml-2">Raio da Região: {currentBiome.regionRadius.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.05"
                    max="0.35"
                    step="0.01"
                    value={currentBiome.regionRadius}
                    onChange={(e) => handleChange(currentBiome.name, 'regionRadius', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-radius`}
                  />
                </div>

                {/* Attraction Force (if exists) */}
                {currentBiome.attractionForce !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 flex items-center">
                      <InfoTooltip text="Intensidade com que este bioma puxa partículas em sua direção. Valores maiores = atração mais forte e partículas mais concentradas. Use com cuidado: valores muito altos podem criar acúmulo excessivo." />
                      <span className="ml-2">Força de Atração: {currentBiome.attractionForce.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={currentBiome.attractionForce}
                      onChange={(e) => handleChange(currentBiome.name, 'attractionForce', e.target.value)}
                      className="w-full"
                      data-testid={`${currentBiome.name}-attraction`}
                    />
                  </div>
                )}

                {/* Repel Force (if exists) */}
                {currentBiome.repelForce !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 flex items-center">
                      <InfoTooltip text="Intensidade com que este bioma empurra partículas para longe quando ficam muito próximas. Cria efeito de fluxo perene - partículas circulam mas não acumulam. Essencial para biomas como Reconhecimento que devem manter equilíbrio." />
                      <span className="ml-2">Força de Repulsão: {currentBiome.repelForce.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={currentBiome.repelForce}
                      onChange={(e) => handleChange(currentBiome.name, 'repelForce', e.target.value)}
                      className="w-full"
                      data-testid={`${currentBiome.name}-repel`}
                    />
                  </div>
                )}

                {/* Ego Force (if exists) */}
                {currentBiome.egoForce !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 flex items-center">
                      <InfoTooltip text="Força especial do Ser Humano que influencia TODAS as partículas próximas (raio de 40% da tela), independente do bioma de origem. Representa o ego individual que atrai, desvia e causa caos no movimento de todas as partículas. Valores altos criam um centro magnético caótico." />
                      <span className="ml-2">Força do Ego: {currentBiome.egoForce.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.1"
                      value={currentBiome.egoForce}
                      onChange={(e) => handleChange(currentBiome.name, 'egoForce', e.target.value)}
                      className="w-full"
                      data-testid={`${currentBiome.name}-ego`}
                    />
                  </div>
                )}
              </div>

              {/* Export Config Button */}
              <button
                onClick={() => {
                  const config = { biomes, customBiomes };
                  console.log('Current Configuration:', config);
                  navigator.clipboard.writeText(JSON.stringify(config, null, 2));
                  alert('Configuração copiada para clipboard!');
                }}
                className="w-full mt-6 px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300"
                style={{
                  background: 'rgba(0, 155, 58, 0.2)',
                  borderColor: 'rgba(0, 155, 58, 0.4)',
                }}
                data-testid="export-config"
              >
                <span className="text-white text-sm font-medium">
                  📋 Copiar Configuração
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
